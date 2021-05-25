import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'

const DatePicker = ({ chosenDate, onSet, display, minimumDate, maximumDate }) => {

    const [date, setDate] = useState(new Date(chosenDate));

    return (
        <DateTimePicker
            locale='pt-BR'
            value={date}
            mode="date"
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            display={display}
            onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date
                if (event.type == "set") {
                    setDate(currentDate)
                    onSet(currentDate)
                } else {
                    onSet(date)
                }
            }}
            style={{ backgroundColor: '#FFF' }}
        />
    );
}

export default DatePicker

