import React, { useState } from "react";
import {
  Button,
  Input,
  DateRangePicker,
  DatePicker,
  TimeInput,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { ClockCircleLinearIcon } from "../../assets/icons/ClockCircleLinearIcon";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DetailsPermissions = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [isMultipleDate, setIsMultipleDate] = useState(true);
  const [isMultipleHour, setIsMultipleHour] = useState(true);

  const toggleDay = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  return (
    <div>
      <form className="mt-5">
        <div className="flex flex-col max-w-3xl gap-4">
          <Input label="Email visitant" type="text" />
          <div>
            <Button
              className={`bg-indigo-200 text-white mr-2 ${
                isMultipleDate ? "bg-indigo-400" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleDate(true)}
            >
              Multiple date
            </Button>
            <Button
              className={`bg-indigo-200 px-6 text-white ${
                !isMultipleDate ? "bg-indigo-400" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleDate(false)}
            >
              Single date
            </Button>
          </div>
          {isMultipleDate ? (
            <div>
              <DateRangePicker label="Select a date range" />
            </div>
          ) : (
            <div>
              <DatePicker label="Select a date" />
            </div>
          )}
          <div className="overflow-x-auto flex flex-row flex-nowrap gap-2 ">
            {daysOfWeek.map((day, index) => (
              <Button
                className={`bg-gray-200 border-gray-200 text-gray-500 hover:bg-gray-300 hover:border-gray-300 px-12 lg:px-4 ${
                  selectedDays.includes(day)
                    ? "bg-gray-400 hover:bg-gray-400 text-white"
                    : ""
                }`}
                key={index}
                onClick={() => toggleDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
          <div>
            <Button
              className={`bg-indigo-200 text-white mr-2 ${
                isMultipleHour ? "bg-indigo-400" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleHour(true)}
            >
              Multiple hours
            </Button>
            <Button
              className={`bg-indigo-200 px-6 text-white ${
                !isMultipleHour ? "bg-indigo-400" : ""
              }`}
              variant="flat"
              onClick={() => setIsMultipleHour(false)}
            >
              Single hour
            </Button>
          </div>
          {isMultipleHour ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <TimeInput
                  label="Select the start time"
                  labelPlacement="inside"
                  endContent={
                    <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <TimeInput
                  label="Select the end time"
                  labelPlacement="inside"
                  endContent={
                    <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
              <div className="mt-2 pl-2">
                <RadioGroup
                  className="text-xs"
                  label="Expiration time "
                  orientation="horizontal"
                >
                  <Radio className="mr-2" value="1">
                    <span className="text-sm"> By range</span>
                  </Radio>
                  <Radio value="2">
                    <span className="text-sm"> By entry</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          ) : (
            <div>
              <TimeInput
                label="Select a one hour time slot"
                labelPlacement="inside"
                endContent={
                  <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
          )}

          <div className="mt-8 py-4 flex justify-center lg:justify-end ">
            <Button color="secondary" variant="shadow">
              Approve
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailsPermissions;
