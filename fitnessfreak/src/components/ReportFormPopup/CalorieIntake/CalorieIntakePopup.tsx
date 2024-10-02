import React, { useEffect } from "react";
import "../popup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const color = "#ffc20e";

  const [date, setDate] = React.useState<Dayjs>(dayjs());
  const [time, setTime] = React.useState<Dayjs>(dayjs());

  const [calorieInake, setCalorieIntake] = React.useState<any>({
    item: "",
    date: "",
    quantity: "",
    quantitytype: "g",
  });

  const [items, setItems] = React.useState<any[]>([]); // Ensure items is an array

  const saveCalorieIntake = async () => {
    let tempdate = date.format("YYYY-MM-DD");
    let temptime = time.format("HH:mm:ss");
    let tempdatetime = tempdate + " " + temptime;
    let finaldatetime = new Date(tempdatetime);
    console.log(finaldatetime + " finalDateTime");

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/calorieintake/addcalorieintake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            item: calorieInake.item,
            date: finaldatetime,
            quantity: calorieInake.quantity,
            quantitytype: calorieInake.quantitytype,
          }),
        }
      );
      const data = await response.json();
      if (data.ok) {
        toast.success("Calorie intake added successfully");
        getCalorieIntake();
      } else {
        toast.error("Error in adding calorie intake");
      }
    } catch (error) {
      toast.error("Error in adding calorie intake");
      console.error(error);
    }
  };

  const getCalorieIntake = async () => {
    setItems([]); // Reset items to an empty array
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/calorieintake/getcalorieintakebydate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );
      const data = await response.json();
      if (data.ok) {
        console.log(data.data, "calorie intake data for date!");
        setItems(Array.isArray(data.data) ? data.data : []); // Ensure the response is an array
      } else {
        toast.error("Error in getting the calorie intake");
      }
    } catch (error) {
      toast.error("Error in getting the calorie intake");
      console.log(error);
    }
  };

  const deleteCaloriIntake = async (item: any) => {
    try {
      fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/calorieintake/deletecalorieintake", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          item: item.item,
          date: item.date,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            toast.success("Calorie intake item deleted successfully");
            getCalorieIntake();
          } else {
            toast.error("Error  in deleting the calorie Intake");
          }
        });
    } catch (error) {
      toast.error("Error in deleting Calorie intake");
      console.error(error);
    }
  };

  const selectedDay = (val: Dayjs) => {
    setDate(val);
  };

  useEffect(() => {
    getCalorieIntake();
  }, [date]);

  return (
    <div className="popupout">
      <button
        className="close"
        onClick={() => {
          setShowCalorieIntakePopup(false);
        }}
      >
        <AiOutlineClose />
      </button>
      <div className="popupbox">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic Example"
            value={date}
            onChange={(newValue: Dayjs) => {
              selectedDay(newValue);
            }}
          />
        </LocalizationProvider>
        <TextField
          id="outlined Basic"
          label="Food item Use"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setCalorieIntake({ ...calorieInake, item: e.target.value });
          }}
        />
        <TextField
          id="outlined Basic"
          label="Food item Amount (in gms)"
          variant="outlined"
          type="number"
          color="warning"
          onChange={(e) => {
            setCalorieIntake({ ...calorieInake, quantity: e.target.value });
          }}
        />
        <div className="timebox">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="controlled picker"
              value={time}
              onChange={(newValue: Dayjs) => {
                setTime(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <Button variant="contained" color="warning" onClick={saveCalorieIntake}>
          save
        </Button>
        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any, index: number) => {
            return (
              <div className="item" key={index}>
                <h3>{item.item}</h3>
                <h3>
                  {item.quantity}
                  {item.quantitytype}
                </h3>
                <Button
                  onClick={() => {
                    deleteCaloriIntake(item);
                  }}
                >
                  <AiFillDelete />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalorieIntakePopup;
