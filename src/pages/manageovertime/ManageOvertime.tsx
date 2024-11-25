import React, { useState } from "react";
import Title from "@/components/Title/Title";
import { Button, TimeInput } from "@nextui-org/react";
import { ClockCircleLinearIcon } from "@/assets/icons/ClockCircleLinearIcon";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { toast, ToastContainer } from "react-toastify";
import { updateOvertime } from "@/services/overtimeService";
import { IManageOvertimeRequest } from "@/interfaces/Overtime";

const ManageOvertime: React.FC = () => {
  const [overtime, setOvertime] = useState(
    parseAbsoluteToLocal("2024-04-08T18:45:00Z")
  );

  const formatTime = (time): string => {
    return `${time.hour.toString().padStart(2, "0")}:${time.minute
      .toString()
      .padStart(2, "0")}:${time.second.toString().padStart(2, "0")}`;
  };

  
  const postManageOvertime = async (): Promise<void> => {
    if (!overtime) {
      toast("Please fill all the fields", { type: "error" });
      return;
    }

    const formattedTime: string = formatTime(overtime);

    const overtimeData: IManageOvertimeRequest = {
      overtime: formattedTime,
    };

    try {
      await updateOvertime(overtimeData); 
      toast("Overtime updated successfully", { type: "success" });
    } catch (error) {
      toast("Error updating overtime", { type: "error" });
      console.error("Error updating overtime:", error);
    }
  };

  return (
    <div className="container-tab">
      <Title
        title="Manage Overtime"
        description="Change these parameters only if necessary"
      />
      <div className="mt-8 max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          <TimeInput
            label="Overtime"
            labelPlacement="inside"
            hideTimeZone
            hourCycle={24}
            endContent={
              <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={overtime}
            onChange={setOvertime}
          />
        </div>

        <div className="mt-10">
          <Button
            onPress={postManageOvertime}
            className="bg-zinc-700 text-white"
            variant="shadow"
          >
            Save changes
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageOvertime;
