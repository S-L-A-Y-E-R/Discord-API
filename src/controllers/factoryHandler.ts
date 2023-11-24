import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";

export const deleteOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export const updateOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        date: newDoc,
      },
    });
  });

export const getOne = (Model: Model<Document>, populateOptions: string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query: any = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions as string);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const getAll = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort();
    const doc = await features.query.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
