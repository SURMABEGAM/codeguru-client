import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";

// ─── TEXT MAP (same as Navbar, centralized here) ──────────────────────────
export const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", flag: "🇧🇩" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
  { code: "zh", label: "Chinese", nativeLabel: "中文", flag: "🇨🇳" },
];

export const Text = {
  en: {
    // Navbar
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
    // AddReview
    addReview: "Add a Review",
    yourName: "Your Name",
    courseName: "Course Name",
    writeReview: "Write your review...",
    submitReview: "Submit Review",
    reviewSuccess: "Review submitted!",
    // TopInstructors
    topInstructors: "Our Top Instructors",
    topInstructorsSub: "Learn from the best minds in tech",
    courses_label: "Courses",
    // StudentReview
    studentReviews: "Student Reviews",
    studentReviewsSub: "What our learners say about CodeGuru",
    // Theme
    switchToDark: "Switch to Dark Mode",
    switchToLight: "Switch to Light Mode",
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
    addReview: "রিভিউ দিন",
    yourName: "আপনার নাম",
    courseName: "কোর্সের নাম",
    writeReview: "আপনার রিভিউ লিখুন...",
    submitReview: "রিভিউ জমা দিন",
    reviewSuccess: "রিভিউ জমা হয়েছে!",
    topInstructors: "আমাদের সেরা ইন্সট্রাক্টর",
    topInstructorsSub: "প্রযুক্তির সেরা বিশেষজ্ঞদের কাছ থেকে শিখুন",
    courses_label: "কোর্স",
    studentReviews: "শিক্ষার্থীদের মতামত",
    studentReviewsSub: "আমাদের শিক্ষার্থীরা কী বলছেন",
    switchToDark: "ডার্ক মোডে যান",
    switchToLight: "লাইট মোডে যান",
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
    addReview: "أضف تقييماً",
    yourName: "اسمك",
    courseName: "اسم الدورة",
    writeReview: "اكتب تقييمك...",
    submitReview: "إرسال التقييم",
    reviewSuccess: "تم إرسال التقييم!",
    topInstructors: "أبرز المدربين",
    topInstructorsSub: "تعلم من أفضل العقول في التكنولوجيا",
    courses_label: "دورات",
    studentReviews: "تقييمات الطلاب",
    studentReviewsSub: "ماذا يقول المتعلمون عن CodeGuru",
    switchToDark: "التبديل إلى الوضع الداكن",
    switchToLight: "التبديل إلى الوضع الفاتح",
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
    addReview: "समीक्षा जोड़ें",
    yourName: "आपका नाम",
    courseName: "कोर्स का नाम",
    writeReview: "अपनी समीक्षा लिखें...",
    submitReview: "समीक्षा जमा करें",
    reviewSuccess: "समीक्षा जमा हो गई!",
    topInstructors: "हमारे शीर्ष प्रशिक्षक",
    topInstructorsSub: "टेक के सर्वश्रेष्ठ विशेषज्ञों से सीखें",
    courses_label: "कोर्स",
    studentReviews: "छात्र समीक्षाएं",
    studentReviewsSub: "हमारे शिक्षार्थी CodeGuru के बारे में क्या कहते हैं",
    switchToDark: "डार्क मोड में जाएं",
    switchToLight: "लाइट मोड में जाएं",
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
    addReview: "Ajouter un avis",
    yourName: "Votre nom",
    courseName: "Nom du cours",
    writeReview: "Écrivez votre avis...",
    submitReview: "Soumettre l'avis",
    reviewSuccess: "Avis soumis !",
    topInstructors: "Nos meilleurs formateurs",
    topInstructorsSub: "Apprenez des meilleurs experts en technologie",
    courses_label: "Cours",
    studentReviews: "Avis des étudiants",
    studentReviewsSub: "Ce que nos apprenants disent de CodeGuru",
    switchToDark: "Passer en mode sombre",
    switchToLight: "Passer en mode clair",
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
    addReview: "添加评价",
    yourName: "您的姓名",
    courseName: "课程名称",
    writeReview: "写下您的评价...",
    submitReview: "提交评价",
    reviewSuccess: "评价已提交！",
    topInstructors: "顶级讲师",
    topInstructorsSub: "向科技领域最优秀的人才学习",
    courses_label: "课程",
    studentReviews: "学生评价",
    studentReviewsSub: "我们的学员如何评价 CodeGuru",
    switchToDark: "切换到深色模式",
    switchToLight: "切换到浅色模式",
  },
};

// ─── Context ──────────────────────────────────────────────────────────────
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { user, loading, logOut } = useContext(AuthContext);
  console.log("AppContext User:", user);
  const [lang, setLang] = useState(
    () => localStorage.getItem("cg_lang") || "en",
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("cg_theme") || "light",
  );

  const isDark = theme === "dark";
  const isRTL = lang === "ar";
  const t = Text[lang] || Text.en;

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("cg_theme", theme);
  }, [theme, isDark]);

  // Apply RTL
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("cg_lang", lang);
  }, [lang, isRTL]);

  const changeLang = (code) => setLang(code);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        logOut,

        lang,
        changeLang,
        theme,
        toggleTheme,
        isDark,
        isRTL,
        t,
        LANGUAGES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ─── Custom hook ──────────────────────────────────────────────────────────
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
