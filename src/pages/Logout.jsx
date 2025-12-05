import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";

export default function Logout() {
    const navigate = useNavigate();

    const handleConfirmLogout = () => {
        logoutUser();
        navigate("/");
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <section className="logout-page">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="logout-buttons">
            <button className="confirm-btn" onClick={handleConfirmLogout}>
                Yes, Log me Out
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
                Cancel
            </button>
            </div>
        </section>
    );
}