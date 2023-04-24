import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Confirm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  useEffect(() => {
    fetch(`/api/invite/verify/${token}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          navigate("/error", { state: { message: data.error } });
        } else {
          navigate("/");
        }
      });
  }, [navigate, token]);
};

export default Confirm;
