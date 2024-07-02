import { notification } from "antd";

const Notify = (type, message, description, duration = 5) => {
  notification.config({
    duration: duration,
  });
  notification[type]({
    message,
    description,
  });
};
export default Notify;