import moment from 'moment';
import Employee from '../models/employees.model';

const dateFormat = "DD/MM/YYYY";

export const create = async (ctx) => {
    const dataToCreate = {...ctx.request.body};
    let { dob } = ctx.request.body;
    if (dob) {
        dataToCreate.dob = moment.utc(dob, dateFormat);
        dataToCreate.nextDob = getNextDob(dataToCreate.dob);
    }
    ctx.status = 201;
    ctx.body = await Employee.create(dataToCreate);
};

export const getAll = async (ctx) => {
    ctx.body = await Employee.find({});
};

export const getById = async (ctx) => {
    const result = await Employee.findById(ctx.params.id);
    if (result) {
        ctx.body = result;
    } else {
        ctx.status = 204;
    }
};

export const updateById = async (ctx) => {
    const dataToUpdate = {...ctx.request.body};
    const { dob } = ctx.request.body;
    if (dob) {
        dataToUpdate.dob = moment.utc(dob, dateFormat);
        dataToUpdate.nextDob = getNextDob(dataToUpdate.dob);
    }
    ctx.status = 204;
    await Employee.updateOne({_id: ctx.params.id}, dataToUpdate);
};

export const deleteById = async (ctx) => {
    ctx.status = 204;
    await Employee.deleteOne({_id: ctx.params.id});
};

export const getNextDob = (dob, yearsToAdd = 0) => {
    const currentYear = moment().year(),
        dayDob = moment(dob).date(),
        monthDob = moment(dob).month(),
        now = moment.now(),
        dateNow = moment.utc([moment(now).year(), moment(now).month(), moment(now).date()]);

    let currentDob = moment.utc([currentYear+yearsToAdd, monthDob, dayDob]);

    if (currentDob.toString() === 'Invalid date') // 29.02
        currentDob = moment.utc([currentYear, 2, 1]); // set to => 01.03.year

    return currentDob < dateNow ? moment.utc([currentYear+1, monthDob, dayDob]) : currentDob;
};
