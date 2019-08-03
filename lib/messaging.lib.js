import moment from 'moment';
const nodemailer = require('nodemailer');

import Employee from '../models/employees.model';
import {getNextDob} from '../controllers/employees.controller';

const daysToDOB = process.env.DAYS_TO_DOB || 5;

export const init = (timeout) => {
    console.log(`Interval of messages is ${timeout / 1000} seconds.`);
    setInterval(handleMessages, timeout);
};

const handleMessages = async () => {
    const dayToDob = moment().add(daysToDOB, 'd');
    const congratulationBorder = moment.utc([dayToDob.year(), dayToDob.month(), dayToDob.date()]);

    const results = await Employee.find().where('nextDob').lte(congratulationBorder.toDate());

    for (const result of results) {
        const messageIsSend = await sendMessage(result);
        if (messageIsSend) {
            await Employee.updateOne({_id: result.id}, {nextDob: getNextDob(result.dob, 1)});
        }
    }
    console.log('Checking dob messages...');
};

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    auth: {
        user: 'test.task.test.task@bk.ru',
        pass: 'ASDqwe123@'
    }
});

const sendMessage = async (employee) => {
    try{
        const info = await transporter.sendMail({
            from: 'test.task.test.task@bk.ru',
            to: process.env.TEST_MAIL || employee.email,
            subject: `Happy Birthday! Dear ${employee.name}!`,
            text: `Happy Birthday!
                        Some awesome regards from our company... bla-bla-bla`
        });
        console.log(`Email sent: ${info.response}`);
        return true;
    } catch (error) {
        console.error(`Something went wrong with sending email => ${error}`);
        return false;
    }
};
