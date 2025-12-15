import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken } = useStateContext();
  const [showMenu, setShowMenu] = useState(false); // Default to hidden on small screens
  const navigate = useNavigate(); // For redirect after logout

  if (!token) {
    return <Navigate to="/Login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      navigate('/Login'); // Redirect to login after logout
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => setUser(data));
  }, []);

  return (
    <div className="layout">
      {/* Hamburger Icon always visible on mobile */}
      <div className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Sidebar menu with slide-in effect on mobile */}
      <aside className={`sidebar ${showMenu ? 'show' : ''}`}>
        <Link to="/dashboard" className="nav-link" onClick={() => setShowMenu(false)}>
          Dashboard
        </Link>
        <Link to="/users" className="nav-link" onClick={() => setShowMenu(false)}>
          Users
        </Link>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="header">
          <div className="logo"></div>
          <div className="user-info">
            <span>{user.name}</span>
            <a href="/" onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </div>
        </header>
        <main className="main">
          <Outlet />
        </main>
      </div>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Styles */}
      <style jsx>{`
        /* Layout styles */
        .layout {
          display: flex;
          height: 100vh;
          font-family: 'Arial', sans-serif;
        }

        /* Sidebar styles */
        .sidebar {
          background-color: #2c3e50;
          padding: 20px;
          width: 200px;
          height: 1100px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        /* Slide in/out on mobile */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 200px;
            background-color: #2c3e50;
            padding-top: 60px;
            transform: translateX(-100%);
            opacity: 0;
            z-index: 999;
          }
          /* Show sidebar when active */
          .sidebar.show {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Navigation links */
        .nav-link {
          color: #ecf0f1;
          text-decoration: none;
          margin: 10px 0;
          padding: 10px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .nav-link:hover {
          background-color: #34495e;
        }

        /* Main content styles */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 0; /* No margin on mobile, sidebar overlays */
        }

        /* Header styles */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: relative; /* For overlay elements if needed */
        }

        .logo {
          font-weight: bold;
          font-size: 1.5em;
        }

        .user-info {
          display: flex;
          align-items: center;
        }

        .btn-logout {
          margin-left: 15px;
          background: transparent;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          font-size: 1em;
        }

        /* Main area styles */
        .main {
          padding: 20px;
          flex: 1;
          background-color: #f4f4f4;
        }

        /* Notification styles */
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #27ae60;
          color: #fff;
          padding: 10px 20px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        /* Hamburger menu styles */
        .menu-toggle {
          display: none;
          position: fixed;
          top: 15px;
          left: 15px;
          cursor: pointer;
          flex-direction: column;
          justify-content: space-between;
          width: 25px;
          height: 18px;
          z-index: 1000;
        }
        .bar {
          height: 3px;
          width: 100%;
          background-color: #34495e;
          border-radius: 2px;
        }

        /* Show hamburger on small screens */
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}