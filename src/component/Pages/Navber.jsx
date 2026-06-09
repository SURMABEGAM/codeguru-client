import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

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
} from "react-icons/hi";

// ─── Language config ─────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", flag: "🇧🇩" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
  { code: "zh", label: "Chinese", nativeLabel: "中文", flag: "🇨🇳" },
];

// ─── i18n text map ─────────────────────────────────────────────────────────
const TEXT = {
  en: {
    home: "Home",
    courses: "Courses",
    dashboard: "Dashboard",
    explore: "Explore",
    login: "Login",
    logout: "Logout",
    search: "Search courses...",
    myCourses: "My Courses",
    addCourse: "Add Course",
    profile: "Profile",
    settings: "Settings",
    notifications: "Notifications",
    markAllRead: "Mark all read",
    noNotifs: "No new notifications",
    navigation: "Navigation",
    mySpace: "My Space",
    exploreAll: "Explore All Courses",
    loginTo: "Login to CodeGuru",
    language: "Language",
    logoutConfirmTitle: "Are you sure?",
    logoutConfirmText: "You will be logged out from CodeGuru",
    logoutConfirmBtn: "Yes, logout",
    logoutSuccess: "Logged Out!",
    logoutSuccessText: "You have successfully logged out.",
    newCourse: "New course added",
    courseUpdated: "Course updated",
    enrolled: "Enrollment confirmed",
    reminder: "Study reminder",
  },
  bn: {
    home: "হোম",
    courses: "কোর্স",
    dashboard: "ড্যাশবোর্ড",
    explore: "এক্সপ্লোর",
    login: "লগইন",
    logout: "লগআউট",
    search: "কোর্স খুঁজুন...",
    myCourses: "আমার কোর্স",
    addCourse: "কোর্স যোগ করুন",
    profile: "প্রোফাইল",
    settings: "সেটিংস",
    notifications: "নোটিফিকেশন",
    markAllRead: "সব পড়া হিসেবে চিহ্নিত করুন",
    noNotifs: "কোনো নতুন নোটিফিকেশন নেই",
    navigation: "নেভিগেশন",
    mySpace: "আমার স্পেস",
    exploreAll: "সব কোর্স দেখুন",
    loginTo: "CodeGuru-তে লগইন করুন",
    language: "ভাষা",
    logoutConfirmTitle: "আপনি কি নিশ্চিত?",
    logoutConfirmText: "আপনি CodeGuru থেকে লগআউট হবেন",
    logoutConfirmBtn: "হ্যাঁ, লগআউট",
    logoutSuccess: "লগআউট সফল!",
    logoutSuccessText: "আপনি সফলভাবে লগআউট হয়েছেন।",
    newCourse: "নতুন কোর্স যোগ হয়েছে",
    courseUpdated: "কোর্স আপডেট হয়েছে",
    enrolled: "এনরোলমেন্ট নিশ্চিত হয়েছে",
    reminder: "পড়াশোনার রিমাইন্ডার",
  },
  ar: {
    home: "الرئيسية",
    courses: "الدورات",
    dashboard: "لوحة التحكم",
    explore: "استكشف",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    search: "ابحث عن الدورات...",
    myCourses: "دوراتي",
    addCourse: "إضافة دورة",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    notifications: "الإشعارات",
    markAllRead: "تحديد الكل كمقروء",
    noNotifs: "لا توجد إشعارات جديدة",
    navigation: "التنقل",
    mySpace: "مساحتي",
    exploreAll: "استعرض جميع الدورات",
    loginTo: "تسجيل الدخول إلى CodeGuru",
    language: "اللغة",
    logoutConfirmTitle: "هل أنت متأكد؟",
    logoutConfirmText: "سيتم تسجيل خروجك من CodeGuru",
    logoutConfirmBtn: "نعم، تسجيل الخروج",
    logoutSuccess: "تم تسجيل الخروج!",
    logoutSuccessText: "تم تسجيل خروجك بنجاح.",
    newCourse: "تمت إضافة دورة جديدة",
    courseUpdated: "تم تحديث الدورة",
    enrolled: "تم تأكيد التسجيل",
    reminder: "تذكير بالدراسة",
  },
  hi: {
    home: "होम",
    courses: "कोर्स",
    dashboard: "डैशबोर्ड",
    explore: "एक्सप्लोर",
    login: "लॉगिन",
    logout: "लॉगआउट",
    search: "कोर्स खोजें...",
    myCourses: "मेरे कोर्स",
    addCourse: "कोर्स जोड़ें",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    notifications: "सूचनाएं",
    markAllRead: "सभी पढ़ा हुआ चिह्नित करें",
    noNotifs: "कोई नई सूचना नहीं",
    navigation: "नेविगेशन",
    mySpace: "मेरा स्पेस",
    exploreAll: "सभी कोर्स देखें",
    loginTo: "CodeGuru में लॉगिन करें",
    language: "भाषा",
    logoutConfirmTitle: "क्या आप सुनिश्चित हैं?",
    logoutConfirmText: "आप CodeGuru से लॉगआउट हो जाएंगे",
    logoutConfirmBtn: "हाँ, लॉगआउट",
    logoutSuccess: "लॉगआउट हो गए!",
    logoutSuccessText: "आप सफलतापूर्वक लॉगआउट हो गए।",
    newCourse: "नया कोर्स जोड़ा गया",
    courseUpdated: "कोर्स अपडेट हो गया",
    enrolled: "नामांकन की पुष्टि हुई",
    reminder: "पढ़ाई का रिमाइंडर",
  },
  fr: {
    home: "Accueil",
    courses: "Cours",
    dashboard: "Tableau de bord",
    explore: "Explorer",
    login: "Connexion",
    logout: "Déconnexion",
    search: "Rechercher des cours...",
    myCourses: "Mes Cours",
    addCourse: "Ajouter un cours",
    profile: "Profil",
    settings: "Paramètres",
    notifications: "Notifications",
    markAllRead: "Tout marquer comme lu",
    noNotifs: "Aucune nouvelle notification",
    navigation: "Navigation",
    mySpace: "Mon espace",
    exploreAll: "Voir tous les cours",
    loginTo: "Se connecter à CodeGuru",
    language: "Langue",
    logoutConfirmTitle: "Êtes-vous sûr ?",
    logoutConfirmText: "Vous serez déconnecté de CodeGuru",
    logoutConfirmBtn: "Oui, se déconnecter",
    logoutSuccess: "Déconnecté !",
    logoutSuccessText: "Vous avez été déconnecté avec succès.",
    newCourse: "Nouveau cours ajouté",
    courseUpdated: "Cours mis à jour",
    enrolled: "Inscription confirmée",
    reminder: "Rappel d'étude",
  },
  zh: {
    home: "首页",
    courses: "课程",
    dashboard: "仪表盘",
    explore: "探索",
    login: "登录",
    logout: "退出",
    search: "搜索课程...",
    myCourses: "我的课程",
    addCourse: "添加课程",
    profile: "个人资料",
    settings: "设置",
    notifications: "通知",
    markAllRead: "全部标记为已读",
    noNotifs: "没有新通知",
    navigation: "导航",
    mySpace: "我的空间",
    exploreAll: "浏览所有课程",
    loginTo: "登录 CodeGuru",
    language: "语言",
    logoutConfirmTitle: "您确定吗？",
    logoutConfirmText: "您将从 CodeGuru 退出登录",
    logoutConfirmBtn: "是，退出",
    logoutSuccess: "已退出！",
    logoutSuccessText: "您已成功退出登录。",
    newCourse: "新课程已添加",
    courseUpdated: "课程已更新",
    enrolled: "报名已确认",
    reminder: "学习提醒",
  },
};

// ─── Sample notifications (replace with real API data) ────────────────────
const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: "new_course",
    icon: "star",
    courseTitle: "Advanced Node.js & MongoDB",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "course_updated",
    icon: "update",
    courseTitle: "React Fundamentals",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "enrolled",
    icon: "enrolled",
    courseTitle: "Python for Beginners",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    type: "reminder",
    icon: "clock",
    courseTitle: "JavaScript ES6+",
    time: "2 days ago",
    read: true,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    () => localStorage.getItem("cg_lang") || "en",
  );
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const profileRef = useRef(null);
  const langRef = useRef(null);
  const notifRef = useRef(null);

  const t = TEXT[currentLang] || TEXT.en;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isRTL = currentLang === "ar";

  // close dropdowns on outside click
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

  // RTL support
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
  }, [currentLang, isRTL]);

  const handleLangChange = (code) => {
    setCurrentLang(code);
    localStorage.setItem("cg_lang", code);
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
        logOut().then(() => {
          Swal.fire(t.logoutSuccess, t.logoutSuccessText, "success");
        });
      }
    });
  };

  const currentLangObj =
    LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // ── Notification icon helper
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

  // ── Link class helpers
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50"
        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50 font-semibold"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
    }`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        .navbar-root { font-family: 'Outfit', sans-serif; }

        .glass-nav {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99,102,241,0.08);
        }
        .logo-text {
          font-weight: 800; letter-spacing: -0.5px;
          background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .logo-accent {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .search-container { position: relative; transition: all 0.3s ease; }
        .search-input {
          width: 220px; padding: 8px 16px 8px 40px; border-radius: 12px;
          border: 1.5px solid #e5e7eb; background: #f9fafb;
          font-size: 13px; font-family: 'Outfit', sans-serif; color: #374151;
          outline: none; transition: all 0.3s ease;
        }
        .search-input:focus { width: 260px; border-color: #6366f1; background: #fff; box-shadow: 0 0 0 4px rgba(99,102,241,0.08); }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; transition: color 0.2s; }
        .search-container:focus-within .search-icon { color: #6366f1; }

        .explore-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white; font-size: 13px; font-weight: 600;
          font-family: 'Outfit', sans-serif; border: none; cursor: pointer;
          transition: all 0.25s ease; box-shadow: 0 4px 12px rgba(99,102,241,0.25); white-space: nowrap;
        }
        .explore-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.35); background: linear-gradient(135deg, #4f46e5, #7c3aed); }

        .avatar-ring {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2.5px solid transparent;
          background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #6366f1, #8b5cf6) border-box;
          overflow: hidden; cursor: pointer; transition: all 0.2s ease;
        }
        .avatar-ring:hover { transform: scale(1.05); box-shadow: 0 4px 14px rgba(99,102,241,0.3); }
        .avatar-ring img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

        /* Shared dropdown base */
        .cg-dropdown {
          position: absolute; top: calc(100% + 12px);
          background: white; border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.08); overflow: hidden;
          animation: dropIn 0.2s ease; z-index: 100;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Profile dropdown */
        .profile-dropdown { right: 0; width: 240px; }
        .dropdown-header { padding: 16px; background: linear-gradient(135deg, #f0f0ff, #f8f4ff); border-bottom: 1px solid rgba(99,102,241,0.08); }
        .dropdown-user-name { font-weight: 700; font-size: 14px; color: #1e1b4b; }
        .dropdown-user-email { font-size: 11px; color: #9ca3af; margin-top: 1px; }
        .dropdown-section { padding: 8px; }
        .dropdown-divider { height: 1px; background: #f3f4f6; margin: 4px 12px; }
        .logout-btn-dropdown {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 10px 12px; border-radius: 10px; border: none; background: none;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
          color: #ef4444; cursor: pointer; transition: all 0.2s; text-align: left;
        }
        .logout-btn-dropdown:hover { background: #fff1f1; }

        /* Language dropdown */
        .lang-dropdown { right: 0; width: 200px; padding: 8px; }
        .lang-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 12px; border-radius: 10px; cursor: pointer;
          font-size: 13px; font-weight: 500; color: #374151;
          transition: all 0.15s ease; gap: 8px;
        }
        .lang-item:hover { background: #f3f4f6; }
        .lang-item.active { background: #eef2ff; color: #4f46e5; }
        .lang-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 7px 11px; border-radius: 10px; border: 1.5px solid #e5e7eb;
          background: white; font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600; color: #374151;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .lang-btn:hover { border-color: #c7d2fe; background: #f5f3ff; color: #4f46e5; }

        /* Notification dropdown */
        .notif-dropdown { right: 0; width: 320px; max-height: 420px; overflow: hidden; display: flex; flex-direction: column; }
        .notif-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px 10px; border-bottom: 1px solid #f3f4f6;
        }
        .notif-title { font-size: 14px; font-weight: 700; color: #1e1b4b; }
        .mark-read-btn {
          font-size: 11px; font-weight: 600; color: #6366f1;
          background: none; border: none; cursor: pointer; font-family: 'Outfit', sans-serif;
        }
        .notif-list { overflow-y: auto; flex: 1; }
        .notif-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; cursor: pointer; transition: background 0.15s; border-bottom: 1px solid #f9fafb;
        }
        .notif-item:hover { background: #f9fafb; }
        .notif-item.unread { background: #fafaff; }
        .notif-item.unread:hover { background: #f0f0ff; }
        .notif-unread-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #6366f1;
          flex-shrink: 0; margin-top: 5px;
        }
        .notif-text { font-size: 12.5px; font-weight: 500; color: #374151; line-height: 1.45; }
        .notif-time { font-size: 11px; color: #9ca3af; margin-top: 2px; }
        .notif-empty { padding: 32px 16px; text-align: center; color: #9ca3af; font-size: 13px; }
        .notif-badge {
          position: absolute; top: -4px; right: -4px;
          min-width: 17px; height: 17px; border-radius: 9px;
          background: #ef4444; border: 2px solid white;
          font-size: 10px; font-weight: 700; color: white;
          display: flex; align-items: center; justify-content: center; padding: 0 3px;
        }
        .icon-btn {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 10px; border: 1.5px solid #e5e7eb;
          cursor: pointer; color: #6b7280; transition: all 0.2s; background: white;
        }
        .icon-btn:hover { background: #f9fafb; color: #6366f1; border-color: #c7d2fe; }

        /* Mobile */
        .mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); backdrop-filter: blur(4px); z-index: 40; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .mobile-drawer {
          position: fixed; bottom: 0; left: 0; right: 0; background: white;
          border-radius: 24px 24px 0 0; z-index: 50; padding: 8px 16px 32px;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.15);
          animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
          max-height: 90vh; overflow-y: auto;
        }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .drawer-handle { width: 40px; height: 4px; background: #e5e7eb; border-radius: 2px; margin: 12px auto 20px; }
        .drawer-search { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #f9fafb; border-radius: 12px; border: 1.5px solid #e5e7eb; margin-bottom: 16px; }
        .drawer-search input { flex: 1; border: none; background: none; outline: none; font-family: 'Outfit', sans-serif; font-size: 14px; color: #374151; }
        .drawer-section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #9ca3af; text-transform: uppercase; padding: 0 4px; margin-bottom: 6px; margin-top: 12px; }
        .drawer-user-card { display: flex; align-items: center; gap: 12px; padding: 14px; background: linear-gradient(135deg, #f0f0ff, #f8f4ff); border-radius: 14px; margin-bottom: 12px; }
        .drawer-explore-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; border-radius: 14px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif; border: none; cursor: pointer; margin-top: 12px; box-shadow: 0 4px 14px rgba(99,102,241,0.3); }
        .mobile-logout-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 13px 16px; border-radius: 14px; border: 1.5px solid #fee2e2; background: #fff8f8; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; color: #ef4444; cursor: pointer; transition: all 0.2s; margin-top: 6px; text-align: left; }
        .mobile-logout-btn:hover { background: #fff1f1; }
        .login-btn-mobile { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; border-radius: 14px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-decoration: none; font-size: 14px; font-weight: 700; margin-top: 8px; box-shadow: 0 4px 14px rgba(99,102,241,0.3); }
        .hamburger-btn { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; border: 1.5px solid #e5e7eb; background: white; cursor: pointer; color: #374151; transition: all 0.2s; }
        .hamburger-btn:hover { background: #f3f4f6; border-color: #d1d5db; }

        /* Mobile lang grid */
        .lang-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
        .lang-grid-item { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 12px; border: 1.5px solid #e5e7eb; cursor: pointer; font-size: 13px; font-weight: 500; color: #374151; transition: all 0.15s; background: white; }
        .lang-grid-item:hover { border-color: #c7d2fe; background: #f0f0ff; }
        .lang-grid-item.active { border-color: #6366f1; background: #eef2ff; color: #4f46e5; font-weight: 700; }

        /* Mobile notif list */
        .mobile-notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 4px; border-bottom: 1px solid #f3f4f6; cursor: pointer; }
        .mobile-notif-item:last-child { border-bottom: none; }
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
                    {LANGUAGES.map((lang) => (
                      <div
                        key={lang.code}
                        className={`lang-item ${currentLang === lang.code ? "active" : ""}`}
                        onClick={() => handleLangChange(lang.code)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span style={{ fontSize: 18 }}>{lang.flag}</span>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>
                              {lang.nativeLabel}
                            </div>
                            <div style={{ fontSize: 11, color: "#9ca3af" }}>
                              {lang.label}
                            </div>
                          </div>
                        </div>
                        {currentLang === lang.code && (
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
                        {/* Header */}
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

                        {/* List */}
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
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#1e1b4b",
                      }}
                    >
                      {user.displayName}
                    </div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>
                      {user.email}
                    </div>
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
                      <div
                        style={{
                          background: "#f9fafb",
                          borderRadius: 12,
                          padding: "4px 8px",
                        }}
                      >
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
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-grid-item ${currentLang === lang.code ? "active" : ""}`}
                    onClick={() => handleLangChange(lang.code)}
                  >
                    <span style={{ fontSize: 20 }}>{lang.flag}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {lang.nativeLabel}
                      </div>
                    </div>
                    {currentLang === lang.code && (
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
