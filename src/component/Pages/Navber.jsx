import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";

import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineViewGrid,
  HiOutlinePlusCircle,
  HiOutlineCollection,
  HiOutlineLogout,
  HiOutlineLogin,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineMenu,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineSparkles,
  HiOutlineGlobe,
  HiOutlineCheck,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

// ─── Sample notifications ─────────────────────────────────────────────────
const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: "new_course",
    courseTitle: "Advanced Node.js & MongoDB",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "course_updated",
    courseTitle: "React Fundamentals",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "enrolled",
    courseTitle: "Python for Beginners",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    type: "reminder",
    courseTitle: "JavaScript ES6+",
    time: "2 days ago",
    read: true,
  },
];

const Navbar = () => {
  const { user, lang, changeLang, toggleTheme, isDark, isRTL, t, LANGUAGES } =
    useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const profileRef = useRef(null);
  const langRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLangChange = (code) => {
    changeLang(code);
    setLangOpen(false);
    setMobileOpen(false);
  };

  const handleMarkAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const handleMarkOneRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    Swal.fire({
      title: t.logoutConfirmTitle,
      text: t.logoutConfirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: t.logoutConfirmBtn,
    }).then((result) => {
      if (result.isConfirmed) {
        // logOut().then(() => {
        //   Swal.fire(t.logoutSuccess, t.logoutSuccessText, "success");
        // });
      }
    });
  };

  // ── Notification icon
  const NotifIcon = ({ type }) => {
    const base = {
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    };
    if (type === "new_course")
      return (
        <div style={{ ...base, background: "#ede9fe" }}>
          <HiOutlineStar size={16} color="#7c3aed" />
        </div>
      );
    if (type === "course_updated")
      return (
        <div style={{ ...base, background: "#dbeafe" }}>
          <HiOutlineAcademicCap size={16} color="#2563eb" />
        </div>
      );
    if (type === "enrolled")
      return (
        <div style={{ ...base, background: "#dcfce7" }}>
          <HiOutlineCheck size={16} color="#16a34a" />
        </div>
      );
    return (
      <div style={{ ...base, background: "#fef3c7" }}>
        <HiOutlineClock size={16} color="#d97706" />
      </div>
    );
  };

  const getNotifText = (n) => {
    if (n.type === "new_course") return `${t.newCourse}: ${n.courseTitle}`;
    if (n.type === "course_updated")
      return `${t.courseUpdated}: ${n.courseTitle}`;
    if (n.type === "enrolled") return `${t.enrolled}: ${n.courseTitle}`;
    return `${t.reminder}: ${n.courseTitle}`;
  };

  // ── Link classes
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950"
        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950"
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950"
        : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50 font-semibold dark:text-indigo-400 dark:bg-indigo-950"
        : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        .navbar-root { font-family: 'Outfit', sans-serif; }

        /* ── Light glass nav ── */
        .glass-nav {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99,102,241,0.08);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        /* ── Dark glass nav ── */
        .dark .glass-nav {
          background: rgba(15,15,25,0.88);
          border-bottom: 1px solid rgba(99,102,241,0.18);
        }

        .logo-text {
          font-weight: 800; letter-spacing: -0.5px;
          background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .dark .logo-text {
          background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #c4b5fd 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .logo-accent {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── Search ── */
        .search-input {
          width: 220px; padding: 8px 16px 8px 40px; border-radius: 12px;
          border: 1.5px solid #e5e7eb; background: #f9fafb;
          font-size: 13px; font-family: 'Outfit', sans-serif; color: #374151;
          outline: none; transition: all 0.3s ease;
        }
        .dark .search-input {
          border-color: #374151; background: #1e1e2e; color: #e5e7eb;
        }
        .search-input:focus { width: 260px; border-color: #6366f1; background: #fff; box-shadow: 0 0 0 4px rgba(99,102,241,0.08); }
        .dark .search-input:focus { background: #1e1e2e; box-shadow: 0 0 0 4px rgba(99,102,241,0.15); }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; transition: color 0.2s; }
        .search-container { position: relative; transition: all 0.3s ease; }
        .search-container:focus-within .search-icon { color: #6366f1; }

        /* ── Explore button ── */
        .explore-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white; font-size: 13px; font-weight: 600;
          font-family: 'Outfit', sans-serif; border: none; cursor: pointer;
          transition: all 0.25s ease; box-shadow: 0 4px 12px rgba(99,102,241,0.25); white-space: nowrap;
        }
        .explore-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.35); background: linear-gradient(135deg, #4f46e5, #7c3aed); }

        /* ── Theme toggle button ── */
        .theme-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 10px;
          border: 1.5px solid #e5e7eb; background: white;
          cursor: pointer; color: #6b7280; transition: all 0.25s ease;
        }
        .dark .theme-btn {
          border-color: #374151; background: #1e1e2e; color: #a5b4fc;
        }
        .theme-btn:hover { background: #fef3c7; color: #d97706; border-color: #fde68a; transform: rotate(15deg); }
        .dark .theme-btn:hover { background: #1e1b4b; color: #818cf8; border-color: #4338ca; transform: rotate(-15deg); }

        /* ── Avatar ── */
        .avatar-ring {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2.5px solid transparent;
          background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #6366f1, #8b5cf6) border-box;
          overflow: hidden; cursor: pointer; transition: all 0.2s ease;
        }
        .dark .avatar-ring {
          background: linear-gradient(#1e1e2e, #1e1e2e) padding-box, linear-gradient(135deg, #6366f1, #8b5cf6) border-box;
        }
        .avatar-ring:hover { transform: scale(1.05); box-shadow: 0 4px 14px rgba(99,102,241,0.3); }
        .avatar-ring img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

        /* ── Shared dropdown ── */
        .cg-dropdown {
          position: absolute; top: calc(100% + 12px);
          background: white; border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.08); overflow: hidden;
          animation: dropIn 0.2s ease; z-index: 100;
        }
        .dark .cg-dropdown {
          background: #1a1a2e;
          border-color: rgba(99,102,241,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(99,102,241,0.15);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Profile dropdown ── */
        .profile-dropdown { right: 0; width: 240px; }
        .dropdown-header {
          padding: 16px;
          background: linear-gradient(135deg, #f0f0ff, #f8f4ff);
          border-bottom: 1px solid rgba(99,102,241,0.08);
        }
        .dark .dropdown-header {
          background: linear-gradient(135deg, #1e1b4b, #2d1b4e);
          border-bottom-color: rgba(99,102,241,0.2);
        }
        .dropdown-user-name { font-weight: 700; font-size: 14px; color: #1e1b4b; }
        .dark .dropdown-user-name { color: #e0e7ff; }
        .dropdown-user-email { font-size: 11px; color: #9ca3af; margin-top: 1px; }
        .dropdown-section { padding: 8px; }
        .dropdown-divider { height: 1px; background: #f3f4f6; margin: 4px 12px; }
        .dark .dropdown-divider { background: #2d2d44; }
        .logout-btn-dropdown {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 10px 12px; border-radius: 10px; border: none; background: none;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
          color: #ef4444; cursor: pointer; transition: all 0.2s; text-align: left;
        }
        .logout-btn-dropdown:hover { background: #fff1f1; }
        .dark .logout-btn-dropdown:hover { background: #2d1a1a; }

        /* ── Language dropdown ── */
        .lang-dropdown { right: 0; width: 200px; padding: 8px; }
        .lang-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 12px; border-radius: 10px; cursor: pointer;
          font-size: 13px; font-weight: 500; color: #374151;
          transition: all 0.15s ease; gap: 8px;
        }
        .dark .lang-item { color: #d1d5db; }
        .lang-item:hover { background: #f3f4f6; }
        .dark .lang-item:hover { background: #2d2d44; }
        .lang-item.active { background: #eef2ff; color: #4f46e5; }
        .dark .lang-item.active { background: #1e1b4b; color: #a5b4fc; }
        .lang-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 7px 11px; border-radius: 10px; border: 1.5px solid #e5e7eb;
          background: white; font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600; color: #374151;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .dark .lang-btn { background: #1e1e2e; border-color: #374151; color: #d1d5db; }
        .lang-btn:hover { border-color: #c7d2fe; background: #f5f3ff; color: #4f46e5; }
        .dark .lang-btn:hover { background: #1e1b4b; border-color: #4338ca; color: #a5b4fc; }

        /* ── Notification dropdown ── */
        .notif-dropdown { right: 0; width: 320px; max-height: 420px; overflow: hidden; display: flex; flex-direction: column; }
        .notif-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px 10px; border-bottom: 1px solid #f3f4f6;
        }
        .dark .notif-header { border-bottom-color: #2d2d44; }
        .notif-title { font-size: 14px; font-weight: 700; color: #1e1b4b; }
        .dark .notif-title { color: #e0e7ff; }
        .mark-read-btn {
          font-size: 11px; font-weight: 600; color: #6366f1;
          background: none; border: none; cursor: pointer; font-family: 'Outfit', sans-serif;
        }
        .notif-list { overflow-y: auto; flex: 1; }
        .notif-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; cursor: pointer; transition: background 0.15s;
          border-bottom: 1px solid #f9fafb;
        }
        .dark .notif-item { border-bottom-color: #1e1e2e; }
        .notif-item:hover { background: #f9fafb; }
        .dark .notif-item:hover { background: #2d2d44; }
        .notif-item.unread { background: #fafaff; }
        .dark .notif-item.unread { background: #1a1a30; }
        .notif-item.unread:hover { background: #f0f0ff; }
        .dark .notif-item.unread:hover { background: #1e1b4b; }
        .notif-unread-dot { width: 7px; height: 7px; border-radius: 50%; background: #6366f1; flex-shrink: 0; margin-top: 5px; }
        .notif-text { font-size: 12.5px; font-weight: 500; color: #374151; line-height: 1.45; }
        .dark .notif-text { color: #d1d5db; }
        .notif-time { font-size: 11px; color: #9ca3af; margin-top: 2px; }
        .notif-empty { padding: 32px 16px; text-align: center; color: #9ca3af; font-size: 13px; }
        .notif-badge {
          position: absolute; top: -4px; right: -4px;
          min-width: 17px; height: 17px; border-radius: 9px;
          background: #ef4444; border: 2px solid white;
          font-size: 10px; font-weight: 700; color: white;
          display: flex; align-items: center; justify-content: center; padding: 0 3px;
        }
        .dark .notif-badge { border-color: #0f0f19; }
        .icon-btn {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 10px; border: 1.5px solid #e5e7eb;
          cursor: pointer; color: #6b7280; transition: all 0.2s; background: white;
        }
        .dark .icon-btn { background: #1e1e2e; border-color: #374151; color: #9ca3af; }
        .icon-btn:hover { background: #f9fafb; color: #6366f1; border-color: #c7d2fe; }
        .dark .icon-btn:hover { background: #1e1b4b; color: #a5b4fc; border-color: #4338ca; }

        /* ── Mobile drawer ── */
        .mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(4px); z-index: 40; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .mobile-drawer {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: white;
          border-radius: 24px 24px 0 0; z-index: 50; padding: 8px 16px 32px;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.15);
          animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
          max-height: 90vh; overflow-y: auto;
          transition: background 0.3s;
        }
        .dark .mobile-drawer { background: #0f0f19; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .drawer-handle { width: 40px; height: 4px; background: #e5e7eb; border-radius: 2px; margin: 12px auto 20px; }
        .dark .drawer-handle { background: #374151; }
        .drawer-search {
          display: flex; align-items: center; gap: 10px; padding: 10px 14px;
          background: #f9fafb; border-radius: 12px; border: 1.5px solid #e5e7eb; margin-bottom: 16px;
        }
        .dark .drawer-search { background: #1e1e2e; border-color: #374151; }
        .drawer-search input { flex: 1; border: none; background: none; outline: none; font-family: 'Outfit', sans-serif; font-size: 14px; color: #374151; }
        .dark .drawer-search input { color: #e5e7eb; }
        .drawer-section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #9ca3af; text-transform: uppercase; padding: 0 4px; margin-bottom: 6px; margin-top: 12px; }
        .drawer-user-card {
          display: flex; align-items: center; gap: 12px; padding: 14px;
          background: linear-gradient(135deg, #f0f0ff, #f8f4ff); border-radius: 14px; margin-bottom: 12px;
        }
        .dark .drawer-user-card { background: linear-gradient(135deg, #1e1b4b, #2d1b4e); }
        .drawer-user-name { font-weight: 700; font-size: 15px; color: #1e1b4b; }
        .dark .drawer-user-name { color: #e0e7ff; }
        .drawer-user-email { font-size: 12px; color: #9ca3af; }
        .drawer-explore-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
          padding: 13px; border-radius: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white; font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif;
          border: none; cursor: pointer; margin-top: 12px; box-shadow: 0 4px 14px rgba(99,102,241,0.3);
        }
        .mobile-logout-btn {
          display: flex; align-items: center; gap: 12px; width: 100%;
          padding: 13px 16px; border-radius: 14px; border: 1.5px solid #fee2e2;
          background: #fff8f8; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          color: #ef4444; cursor: pointer; transition: all 0.2s; margin-top: 6px; text-align: left;
        }
        .dark .mobile-logout-btn { background: #1a0a0a; border-color: #7f1d1d; }
        .mobile-logout-btn:hover { background: #fff1f1; }
        .dark .mobile-logout-btn:hover { background: #2d1010; }
        .login-btn-mobile {
          display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
          padding: 13px; border-radius: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white;
          text-decoration: none; font-size: 14px; font-weight: 700; margin-top: 8px;
          box-shadow: 0 4px 14px rgba(99,102,241,0.3);
        }
        .hamburger-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 10px; border: 1.5px solid #e5e7eb;
          background: white; cursor: pointer; color: #374151; transition: all 0.2s; position: relative;
        }
        .dark .hamburger-btn { background: #1e1e2e; border-color: #374151; color: #d1d5db; }
        .hamburger-btn:hover { background: #f3f4f6; border-color: #d1d5db; }
        .dark .hamburger-btn:hover { background: #2d2d44; }
        .lang-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
        .lang-grid-item {
          display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 12px;
          border: 1.5px solid #e5e7eb; cursor: pointer; font-size: 13px; font-weight: 500;
          color: #374151; transition: all 0.15s; background: white;
        }
        .dark .lang-grid-item { background: #1e1e2e; border-color: #374151; color: #d1d5db; }
        .lang-grid-item:hover { border-color: #c7d2fe; background: #f0f0ff; }
        .dark .lang-grid-item:hover { background: #1e1b4b; border-color: #4338ca; }
        .lang-grid-item.active { border-color: #6366f1; background: #eef2ff; color: #4f46e5; font-weight: 700; }
        .dark .lang-grid-item.active { border-color: #6366f1; background: #1e1b4b; color: #a5b4fc; }
        .mobile-notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 4px; border-bottom: 1px solid #f3f4f6; cursor: pointer; }
        .dark .mobile-notif-item { border-bottom-color: #2d2d44; }
        .mobile-notif-item:last-child { border-bottom: none; }
        .mobile-notif-section { background: #f9fafb; border-radius: 12px; padding: 4px 8px; }
        .dark .mobile-notif-section { background: #1e1e2e; }

        /* ── Theme toggle row in mobile ── */
        .mobile-theme-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; border-radius: 14px; border: 1.5px solid #e5e7eb;
          background: white; margin-top: 8px; cursor: pointer; transition: all 0.2s;
        }
        .dark .mobile-theme-row { background: #1e1e2e; border-color: #374151; }
        .mobile-theme-row:hover { background: #f9fafb; border-color: #c7d2fe; }
        .dark .mobile-theme-row:hover { background: #2d2d44; border-color: #4338ca; }
        .mobile-theme-label { font-size: 14px; font-weight: 600; color: #374151; font-family: 'Outfit', sans-serif; }
        .dark .mobile-theme-label { color: #d1d5db; }
        .toggle-track {
          width: 44px; height: 24px; border-radius: 12px; position: relative; transition: background 0.3s;
          background: #e5e7eb;
        }
        .dark .toggle-track { background: #6366f1; }
        .toggle-thumb {
          position: absolute; top: 2px; left: 2px;
          width: 20px; height: 20px; border-radius: 50%; background: white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2); transition: transform 0.3s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .dark .toggle-thumb { transform: translateX(20px); }
      `}</style>

      <div className="navbar-root" dir={isRTL ? "rtl" : "ltr"}>
        <header className="glass-nav fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl logo-text">
                Code<span className="logo-accent">Guru</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass}>
                <HiOutlineHome size={16} /> {t.home}
              </NavLink>
              <NavLink to="/courses" className={navLinkClass}>
                <HiOutlineBookOpen size={16} /> {t.courses}
              </NavLink>
              {user && (
                <NavLink to="/dashboard" className={navLinkClass}>
                  <HiOutlineViewGrid size={16} /> {t.dashboard}
                </NavLink>
              )}
            </nav>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xs justify-center">
              <div className="search-container w-full">
                <HiOutlineSearch size={15} className="search-icon" />
                <input
                  type="text"
                  className="search-input w-full"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Explore */}
              <Link to="/courses">
                <button className="explore-btn">
                  <HiOutlineSparkles size={15} /> {t.explore}
                </button>
              </Link>

              {/* ── Theme Toggle ── */}
              <button
                className="theme-btn"
                onClick={toggleTheme}
                title={isDark ? t.switchToLight : t.switchToDark}
              >
                {isDark ? (
                  <HiOutlineSun size={18} />
                ) : (
                  <HiOutlineMoon size={18} />
                )}
              </button>

              {/* ── Language Switcher ── */}
              <div className="relative" ref={langRef}>
                <button
                  className="lang-btn"
                  onClick={() => {
                    setLangOpen(!langOpen);
                    setNotifOpen(false);
                    setProfileOpen(false);
                  }}
                >
                  <span>{currentLangObj.flag}</span>
                  <span>{currentLangObj.code.toUpperCase()}</span>
                  <HiOutlineChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s",
                      transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {langOpen && (
                  <div className="cg-dropdown lang-dropdown">
                    {LANGUAGES.map((l) => (
                      <div
                        key={l.code}
                        className={`lang-item ${lang === l.code ? "active" : ""}`}
                        onClick={() => handleLangChange(l.code)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span style={{ fontSize: 18 }}>{l.flag}</span>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>
                              {l.nativeLabel}
                            </div>
                            <div style={{ fontSize: 11, color: "#9ca3af" }}>
                              {l.label}
                            </div>
                          </div>
                        </div>
                        {lang === l.code && (
                          <HiOutlineCheck size={15} color="#4f46e5" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {user && (
                <div className="flex items-center gap-2">
                  {/* ── Notification Bell ── */}
                  <div className="relative" ref={notifRef}>
                    <button
                      className="icon-btn"
                      onClick={() => {
                        setNotifOpen(!notifOpen);
                        setProfileOpen(false);
                        setLangOpen(false);
                      }}
                    >
                      <HiOutlineBell size={18} />
                      {unreadCount > 0 && (
                        <span className="notif-badge">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </button>
                    {notifOpen && (
                      <div className="cg-dropdown notif-dropdown">
                        <div className="notif-header">
                          <span className="notif-title">
                            {t.notifications}
                            {unreadCount > 0 && (
                              <span
                                style={{
                                  marginLeft: 6,
                                  background: "#6366f1",
                                  color: "white",
                                  borderRadius: 8,
                                  fontSize: 11,
                                  padding: "1px 7px",
                                  fontWeight: 700,
                                }}
                              >
                                {unreadCount}
                              </span>
                            )}
                          </span>
                          {unreadCount > 0 && (
                            <button
                              className="mark-read-btn"
                              onClick={handleMarkAllRead}
                            >
                              {t.markAllRead}
                            </button>
                          )}
                        </div>
                        <div className="notif-list">
                          {notifications.length === 0 ? (
                            <div className="notif-empty">
                              <HiOutlineBell
                                size={32}
                                style={{
                                  margin: "0 auto 8px",
                                  display: "block",
                                  color: "#d1d5db",
                                }}
                              />
                              {t.noNotifs}
                            </div>
                          ) : (
                            notifications.map((n) => (
                              <div
                                key={n.id}
                                className={`notif-item ${!n.read ? "unread" : ""}`}
                                onClick={() => handleMarkOneRead(n.id)}
                              >
                                <NotifIcon type={n.type} />
                                <div style={{ flex: 1 }}>
                                  <div className="notif-text">
                                    {getNotifText(n)}
                                  </div>
                                  <div className="notif-time">{n.time}</div>
                                </div>
                                {!n.read && (
                                  <div className="notif-unread-dot" />
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Profile Dropdown ── */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => {
                        setProfileOpen(!profileOpen);
                        setNotifOpen(false);
                        setLangOpen(false);
                      }}
                      className="flex items-center gap-1.5 p-0 bg-transparent border-none cursor-pointer"
                    >
                      <div className="avatar-ring">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                      <HiOutlineChevronDown
                        size={14}
                        style={{
                          color: "#6b7280",
                          transition: "transform 0.2s",
                          transform: profileOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </button>
                    {profileOpen && (
                      <div className="cg-dropdown profile-dropdown">
                        <div className="dropdown-header">
                          <div className="flex items-center gap-3">
                            <div
                              className="avatar-ring"
                              style={{ width: 42, height: 42 }}
                            >
                              <img src={user.photoURL} alt={user.displayName} />
                            </div>
                            <div>
                              <div className="dropdown-user-name">
                                {user.displayName}
                              </div>
                              <div className="dropdown-user-email">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-section">
                          <NavLink
                            to="/dashboard"
                            className={dropdownLinkClass}
                            onClick={() => setProfileOpen(false)}
                          >
                            <HiOutlineViewGrid size={17} /> {t.dashboard}
                          </NavLink>
                          <NavLink
                            to="/dashboard/my-courses"
                            className={dropdownLinkClass}
                            onClick={() => setProfileOpen(false)}
                          >
                            <HiOutlineCollection size={17} /> {t.myCourses}
                          </NavLink>
                          <NavLink
                            to="/dashboard/add-course"
                            className={dropdownLinkClass}
                            onClick={() => setProfileOpen(false)}
                          >
                            <HiOutlinePlusCircle size={17} /> {t.addCourse}
                          </NavLink>
                          <NavLink
                            to="/dashboard/profile"
                            className={dropdownLinkClass}
                            onClick={() => setProfileOpen(false)}
                          >
                            <HiOutlineUser size={17} /> {t.profile}
                          </NavLink>
                          <NavLink
                            to="/dashboard/settings"
                            className={dropdownLinkClass}
                            onClick={() => setProfileOpen(false)}
                          >
                            <HiOutlineCog size={17} /> {t.settings}
                          </NavLink>
                        </div>
                        <div className="dropdown-divider" />
                        <div style={{ padding: "8px" }}>
                          <button
                            className="logout-btn-dropdown"
                            onClick={handleLogout}
                          >
                            <HiOutlineLogout size={17} /> {t.logout}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!user && (
                <NavLink
                  to="/login"
                  className="explore-btn"
                  style={{ textDecoration: "none" }}
                >
                  <HiOutlineLogin size={15} /> {t.login}
                </NavLink>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden hamburger-btn"
              onClick={() => setMobileOpen(true)}
            >
              <HiOutlineMenu size={20} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    background: "#ef4444",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              )}
            </button>
          </div>
        </header>

        {/* Spacer */}
        <div style={{ height: 64 }} />

        {/* ── Mobile Drawer ── */}
        {mobileOpen && (
          <>
            <div
              className="mobile-overlay"
              onClick={() => setMobileOpen(false)}
            />
            <div className="mobile-drawer">
              <div className="drawer-handle" />

              {/* User card */}
              {user && (
                <div className="drawer-user-card">
                  <div
                    className="avatar-ring"
                    style={{ width: 46, height: 46, flexShrink: 0 }}
                  >
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                  <div>
                    <div className="drawer-user-name">{user.displayName}</div>
                    <div className="drawer-user-email">{user.email}</div>
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="drawer-search">
                <HiOutlineSearch
                  size={17}
                  style={{ color: "#9ca3af", flexShrink: 0 }}
                />
                <input
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      color: "#9ca3af",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <HiOutlineX size={15} />
                  </button>
                )}
              </div>

              {/* Navigation */}
              <div className="drawer-section-title">{t.navigation}</div>
              <NavLink
                to="/"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                <HiOutlineHome size={19} /> {t.home}
              </NavLink>
              <NavLink
                to="/courses"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                <HiOutlineBookOpen size={19} /> {t.courses}
              </NavLink>

              {user && (
                <>
                  <div
                    className="drawer-section-title"
                    style={{ marginTop: 16 }}
                  >
                    {t.mySpace}
                  </div>
                  <NavLink
                    to="/dashboard"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <HiOutlineViewGrid size={19} /> {t.dashboard}
                  </NavLink>
                  <NavLink
                    to="/dashboard/my-courses"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <HiOutlineCollection size={19} /> {t.myCourses}
                  </NavLink>
                  <NavLink
                    to="/dashboard/add-course"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <HiOutlinePlusCircle size={19} /> {t.addCourse}
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <HiOutlineUser size={19} /> {t.profile}
                  </NavLink>
                  <NavLink
                    to="/dashboard/settings"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <HiOutlineCog size={19} /> {t.settings}
                  </NavLink>

                  {/* Mobile Notifications */}
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <>
                      <div
                        className="drawer-section-title"
                        style={{
                          marginTop: 16,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{t.notifications}</span>
                        <button
                          className="mark-read-btn"
                          onClick={handleMarkAllRead}
                          style={{ textTransform: "none", letterSpacing: 0 }}
                        >
                          {t.markAllRead}
                        </button>
                      </div>
                      <div className="mobile-notif-section">
                        {notifications
                          .filter((n) => !n.read)
                          .map((n) => (
                            <div
                              key={n.id}
                              className="mobile-notif-item"
                              onClick={() => handleMarkOneRead(n.id)}
                            >
                              <NotifIcon type={n.type} />
                              <div>
                                <div className="notif-text">
                                  {getNotifText(n)}
                                </div>
                                <div className="notif-time">{n.time}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {/* ── Theme Toggle Mobile ── */}
              <div className="drawer-section-title" style={{ marginTop: 16 }}>
                {isDark ? "🌙" : "☀️"} Theme
              </div>
              <button className="mobile-theme-row" onClick={toggleTheme}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {isDark ? (
                    <HiOutlineMoon size={18} color="#a5b4fc" />
                  ) : (
                    <HiOutlineSun size={18} color="#d97706" />
                  )}
                  <span className="mobile-theme-label">
                    {isDark ? t.switchToLight : t.switchToDark}
                  </span>
                </div>
                <div className="toggle-track">
                  <div className="toggle-thumb">
                    {isDark ? (
                      <HiOutlineMoon size={11} color="#6366f1" />
                    ) : (
                      <HiOutlineSun size={11} color="#d97706" />
                    )}
                  </div>
                </div>
              </button>

              {/* Language Switcher Mobile */}
              <div
                className="drawer-section-title"
                style={{
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <HiOutlineGlobe size={13} /> {t.language}
              </div>
              <div className="lang-grid">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-grid-item ${lang === l.code ? "active" : ""}`}
                    onClick={() => handleLangChange(l.code)}
                  >
                    <span style={{ fontSize: 20 }}>{l.flag}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {l.nativeLabel}
                      </div>
                    </div>
                    {lang === l.code && (
                      <HiOutlineCheck
                        size={14}
                        color="#4f46e5"
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Explore */}
              <Link to="/courses" onClick={() => setMobileOpen(false)}>
                <button className="drawer-explore-btn">
                  <HiOutlineSparkles size={18} /> {t.exploreAll}
                </button>
              </Link>

              {/* Auth */}
              {user ? (
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  <HiOutlineLogout size={19} /> {t.logout}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="login-btn-mobile"
                  onClick={() => setMobileOpen(false)}
                >
                  <HiOutlineLogin size={18} /> {t.loginTo}
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
