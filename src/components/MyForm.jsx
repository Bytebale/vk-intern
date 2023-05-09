import React, { useState } from "react";
import {
  DatePicker,
  Select,
  TimePicker,
  Form,
  Input,
  Button,
  Space,
} from "antd";

export function MyForm() {
  const { TextArea } = Input;

  const initialFormData = {
    tower: undefined,
    level: undefined,
    conferenceRoom: undefined,
    date: undefined,
    timeFrom: undefined,
    timeTo: undefined,
    comment: undefined,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [dateValue, setDateValue] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();

  const towersArr = ["A", "B"];
  const levelsArr = Array.from({ length: 25 }, (_, i) => i + 3);
  const conferenceRoomsArr = Array.from({ length: 10 }, (_, i) => i + 1);

  const onChangeDate = (value, dateString) => {
    setDateValue(value);
    setFormData({ ...formData, date: dateString });
  };

  const onChangeTimeFrom = (value, dateString) => {
    setTimeFrom(value);
    setFormData({ ...formData, timeFrom: dateString });
  };

  const onChangeTimeTo = (value, dateString) => {
    setTimeTo(value);
    setFormData({ ...formData, timeTo: dateString });
  };

  const Apply = () => {
    if (formData) {
      console.log(JSON.stringify(formData));
    } else console.log("Заполните форму");
  };

  const clearForm = () => {
    setTimeFrom(null);
    setTimeTo(null);
    setDateValue(null);
    setFormData(initialFormData);
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      style={{
        maxWidth: 600,
        padding: "16px",
      }}
      defaultValue={initialFormData}
    >
      <Form.Item label="Башня">
        <Select
          value={formData.tower}
          onSelect={(e) => setFormData({ ...formData, tower: e })}
        >
          {towersArr.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Этаж">
        <Select
          value={formData.level}
          disabled={!!!formData.tower}
          onSelect={(e) => setFormData({ ...formData, level: e })}
        >
          {levelsArr.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Комната">
        <Select
          value={formData.conferenceRoom}
          disabled={!!!formData.level}
          onSelect={(e) => setFormData({ ...formData, conferenceRoom: e })}
        >
          {conferenceRoomsArr.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Дата">
        <DatePicker value={dateValue} onChange={onChangeDate} />
      </Form.Item>

      <Form.Item label="Время: ">
        <Space>
          <TimePicker
            placeholder="Начало"
            value={timeFrom}
            format={"HH:mm"}
            onChange={onChangeTimeFrom}
          />

          <TimePicker
            placeholder="Окончание"
            value={timeTo}
            format={"HH:mm"}
            onChange={onChangeTimeTo}
          />
        </Space>
      </Form.Item>

      <Form.Item label="Комментарий">
        <TextArea
          value={formData.comment}
          rows={4}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        ></TextArea>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type="primary" onClick={Apply}>
            Отправить
          </Button>

          <Button htmlType="button" onClick={clearForm}>
            Очистить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
