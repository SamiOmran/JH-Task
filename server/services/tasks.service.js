import task from "../models/task"

export const list = () => {
    return task.find();
}

export const getById = (id) => {
    return task.findById(id);
}