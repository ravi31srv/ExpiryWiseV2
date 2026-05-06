import mongoose from 'mongoose';
declare const Item: mongoose.Model<{
    item: string;
    date: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    item: string;
    date: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    item: string;
    date: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    item: string;
    date: string;
}, mongoose.Document<unknown, {}, {
    item: string;
    date: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    item: string;
    date: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    item: string;
    date: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    item: string;
    date: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Item;
