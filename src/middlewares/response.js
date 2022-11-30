"use strict";
import moment from "momment"

const decorate = (req, res, next) => {

  res.success = (message) => {
    let val = {
      isSuccess: true,
      message: message,
    };

    res.json(val);
  };

  res.data = (item, message) => {
    let val = {
      isSuccess: true,
      message: message,
      data: item,
    };

    if (item.timeStamp) {
      res.set("Last-Modified", moment(item.timeStamp).toISOString());
    }

    res.json(val);
  };

  res.page = (items) => {
    let val = {
      isSuccess: true,
      items: items,
      count: items.length,
    };

   res.json(val);
  };

  res.failure = (error) => {
    let val = {
      isSuccess: false,
      message:error || error.message || "something went wrong",
      error: error,
    };

    res.json(val);
  };

  next()
};

export default decorate