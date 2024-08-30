import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourseLikes } from "../redux/courseSlice";

const useWebSocket = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(setCourseLikes(data)); // Dispatch the updated likes count
    };

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [url, dispatch]);
};

export default useWebSocket;
