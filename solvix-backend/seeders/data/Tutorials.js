const tutorials = [

  // ── TECHNICAL ──────────────────────────────────────────────
  {
    title: "Computer Slow Ho Jaye To Kya Karo",
    category: "Technical", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "computer slow fix karo urdu hindi",
    steps: ["Task Manager kholo (Ctrl+Shift+Esc)", "Zyada CPU use karne wala program band karo", "Disk Cleanup run karo", "Computer restart karo"]
  },
  {
    title: "WiFi Connect Nahi Ho Raha Fix Karo",
    category: "Technical", difficulty: "Easy", duration: "5 minutes",
    videoQuery: "wifi connect nahi ho raha fix urdu",
    steps: ["Router band karke dobara on karo", "Phone mein WiFi off karke on karo", "Network settings reset karo", "Dobara connect karo"]
  },
  {
    title: "Phone Ki Battery Jaldi Khatam Hoti Hai",
    category: "Technical", difficulty: "Easy", duration: "8 minutes",
    videoQuery: "phone battery drain fast fix urdu hindi",
    steps: ["Screen brightness kam karo", "Background apps band karo", "Location aur Bluetooth off karo jab use na ho", "Battery saver mode on karo"]
  },
  {
    title: "Online Fraud Se Kaise Bachein",
    category: "Technical", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "online fraud se kaise bachein urdu",
    steps: ["Anjaan links pe click mat karo", "Password strong banao", "OTP kisi ko mat batao", "Bank SMS turant check karo"]
  },
  {
    title: "Laptop Ki Screen Toot Jaye To Kya Karo",
    category: "Technical", difficulty: "Medium", duration: "15 minutes",
    videoQuery: "laptop screen tooti hui fix urdu hindi",
    steps: ["Pehle laptop band karo", "External monitor se connect karo HDMI se", "Agar warranty hai to company se contact karo", "Nahi to local repair shop jao"]
  },
  {
    title: "Mobile Ka Storage Full Ho Jaye",
    category: "Technical", difficulty: "Easy", duration: "8 minutes",
    videoQuery: "mobile storage full ho jaye kya karein urdu",
    steps: ["Gallery mein se duplicate photos delete karo", "WhatsApp media clear karo", "Unused apps uninstall karo", "Files Google Drive pe upload karo", "Cache clear karo settings se"]
  },
  {
    title: "Printer Kaam Nahi Kar Raha Fix Karo",
    category: "Technical", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "printer not working fix urdu hindi",
    steps: ["Printer off karke dobara on karo", "USB cable check karo", "Driver update karo PC mein", "Print queue clear karo", "Test page print karo"]
  },
  {
    title: "Password Bhool Jao To Kya Karein",
    category: "Technical", difficulty: "Easy", duration: "5 minutes",
    videoQuery: "password bhool gaye recover kaise karein urdu",
    steps: ["Forgot Password option use karo", "Email ya phone se OTP lo", "Naya strong password banao", "Password manager use karo aage ke liye"]
  },
  {
    title: "Android Phone Ko Factory Reset Kaise Karein",
    category: "Technical", difficulty: "Medium", duration: "12 minutes",
    videoQuery: "android factory reset kaise karein urdu",
    steps: ["Pehle important data backup karo", "Settings > General Management kholo", "Reset > Factory Data Reset select karo", "Confirm karo aur wait karo", "Phone dobara setup karo"]
  },
  {
    title: "Zoom Pe Meeting Kaise Join Karein",
    category: "Technical", difficulty: "Easy", duration: "8 minutes",
    videoQuery: "zoom meeting join kaise karein urdu tutorial",
    steps: ["Zoom app download karo", "Meeting ID aur password lo organizer se", "Join Meeting pe click karo", "Audio aur video settings check karo", "Meeting mein shamil ho jao"]
  },
  {
    title: "Google Drive Pe Files Kaise Save Karein",
    category: "Technical", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "google drive pe files save kaise karein urdu",
    steps: ["Google account se login karo", "drive.google.com pe jao", "New > File Upload click karo", "File select karo apne computer se", "Share ka option use karo zaroorat ho to"]
  },
  {
    title: "Phone Hang Kare To Kya Karein",
    category: "Technical", difficulty: "Easy", duration: "7 minutes",
    videoQuery: "phone hang kare to kya karein urdu fix",
    steps: ["Force restart karo power + volume down dabao", "Background apps sab band karo", "RAM clean karo settings se", "Zyada apps ek saath mat chalao", "Phone update check karo"]
  },
  {
    title: "Email Account Hack Ho Jaye To Kya Karein",
    category: "Technical", difficulty: "Medium", duration: "15 minutes",
    videoQuery: "email account hack recover urdu hindi",
    steps: ["Turant password change karo", "Recovery email/phone verify karo", "2-factor authentication on karo", "Active sessions check karo aur unknown logout karo", "Contacts ko inform karo"]
  },
  {
    title: "Windows Update Stuck Ho Jaye To Kya Karein",
    category: "Technical", difficulty: "Medium", duration: "12 minutes",
    videoQuery: "windows update stuck fix urdu hindi",
    steps: ["30 minute wait karo pehle", "Force restart karo", "Windows Update Troubleshooter run karo", "Temp files delete karo", "Manual update download karo Microsoft site se"]
  },
  {
    title: "Bluetooth Device Connect Nahi Ho Raha",
    category: "Technical", difficulty: "Easy", duration: "7 minutes",
    videoQuery: "bluetooth connect nahi ho raha fix urdu",
    steps: ["Bluetooth off karke on karo dono devices mein", "Device ko forget karke dobara pair karo", "Device charge mein hai ya nahi check karo", "Phone restart karo", "Distance kam karo dono devices ke beech"]
  },

  // ── FINANCIAL ──────────────────────────────────────────────
  {
    title: "Ghar Ka Monthly Budget Kaise Banayein",
    category: "Financial", difficulty: "Medium", duration: "20 minutes",
    videoQuery: "ghar ka monthly budget kaise banayein urdu",
    steps: ["Mahine ki poori income likh lo", "Zaruri kharche alag karo (rent, bijli, khana)", "Fuzul kharche identify karo", "Bachat ka target set karo", "Har hafta check karo"]
  },
  {
    title: "Bachat Kaise Karein Simple Tarika",
    category: "Financial", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "paise bachane ke tarike urdu hindi",
    steps: ["Income ka 20% bachat ke liye alag karo", "Alag saving account banao", "Unnecessary subscriptions band karo", "Bahar khana kam karo", "Har mahine progress check karo"]
  },
  {
    title: "Online Business Kaise Shuru Karein",
    category: "Financial", difficulty: "Hard", duration: "45 minutes",
    videoQuery: "online business kaise shuru karein pakistan urdu",
    steps: ["Apna skill identify karo", "Market research karo", "Social media page banao", "Pehle free mein kaam karo", "Dheere dheere pricing set karo", "Customers ke reviews lo"]
  },
  {
    title: "Freelancing Kaise Shuru Karein",
    category: "Financial", difficulty: "Medium", duration: "30 minutes",
    videoQuery: "freelancing kaise shuru karein urdu pakistan beginners",
    steps: ["Fiverr ya Upwork pe account banao", "Profile achi banao — photo aur bio", "Pehle chote projects lo", "Time pe deliver karo", "5 star reviews lene ki koshish karo"]
  },
  {
    title: "Online Shopping Mein Fraud Se Kaise Bachein",
    category: "Financial", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "online shopping fraud se bachne ke tarike urdu",
    steps: ["Sirf trusted websites use karo", "Reviews zaroor parho", "Deal zyada achi lage to shak karo", "COD use karo", "Personal info kabhi share mat karo"]
  },
  {
    title: "Bank Account Kaise Kholein Step by Step",
    category: "Financial", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "bank account kholne ka tarika pakistan urdu",
    steps: ["CNIC aur ek photo tayyar karo", "Apne nazdiki bank branch jao", "Account opening form bharo", "Initial deposit jama karo", "Debit card aur cheque book apply karo"]
  },
  {
    title: "Mobile Banking App Safely Kaise Use Karein",
    category: "Financial", difficulty: "Easy", duration: "12 minutes",
    videoQuery: "mobile banking safely use karne ka tarika urdu",
    steps: ["Sirf official app download karo Play Store se", "Strong PIN set karo", "Public WiFi pe banking mat karo", "Transaction alert SMS on rakho", "Kisi ke saath login details share mat karo"]
  },
  {
    title: "Mehngai Mein Ghar Ka Kharcha Kaise Chalayein",
    category: "Financial", difficulty: "Medium", duration: "20 minutes",
    videoQuery: "mehngai mein ghar ka kharcha kaise chalayein urdu",
    steps: ["Zaroorat aur khwahish mein farq samjho", "Weekly grocery list pehle se banao", "Bulk mein khareedari karo", "Ek emergency fund zaroor banao"]
  },
  {
    title: "Qarz Se Kaise Nijat Paayein",
    category: "Financial", difficulty: "Hard", duration: "30 minutes",
    videoQuery: "qarz se nijat paane ka tarika urdu islamic",
    steps: ["Sare qarz ek jagah likh lo", "Sabse zyada interest wala qarz pehle chukao", "Kharche kam karo temporarily", "Extra income ka zariya dhundho", "Naya qarz mat lo"]
  },

  // ── HOUSEHOLD ──────────────────────────────────────────────
  {
    title: "Ghar Ki Safai Ka Schedule Banao",
    category: "Household", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "ghar ki safai ka schedule kaise banayein urdu",
    steps: ["Roz ke chote kaam list karo", "Hafte mein ek baar bari safai ka din fix karo", "Family members mein kaam baanto", "List wall pe lagao"]
  },
  {
    title: "Bijli Ka Bill Kam Karne Ke Tarike",
    category: "Household", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "bijli ka bill kam karne ke tarike pakistan urdu",
    steps: ["Use na hone wali lights band karo", "AC 26 degree pe rakho", "LED bulbs lagao", "Geyser sirf zarurat par on karo", "Fridge ka door jaldi band karo"]
  },
  {
    title: "Ghar Mein Paani Ka Pressure Kam Ho Jaye",
    category: "Household", difficulty: "Medium", duration: "20 minutes",
    videoQuery: "ghar mein pani ka pressure kam ho jaye fix urdu",
    steps: ["Pehle main valve check karo", "Pipes mein koi blockage dekho", "Motor ka pressure check karo", "Plumber ko call karo agar issue na mile"]
  },
  {
    title: "Ghar Ka Kirana List Kaise Manage Karein",
    category: "Household", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "grocery list manage kaise karein urdu tips",
    steps: ["Har hafte ek din shopping ka fix karo", "Pehle se list banao", "Stock check karo pehle", "Zaruri cheezein pehle likho", "Budget set karo"]
  },
  {
    title: "Cooking Ka Time Kam Kaise Karein",
    category: "Household", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "cooking time kam kaise karein meal prep urdu",
    steps: ["Sabziyan pehle se kaat ke rakh lo", "Ek baar mein zyada khana banao", "Simple recipes dhundho", "Kitchen organized rakho", "Weekly meal plan banao"]
  },
  {
    title: "Ghar Mein Choti Repair Khud Kaise Karein",
    category: "Household", difficulty: "Medium", duration: "25 minutes",
    videoQuery: "ghar ki choti repair khud karne ka tarika urdu",
    steps: ["YouTube pe tutorial dekho pehle", "Zaruri tools ghar mein rakho", "Leaking tap aur loose screws khud theek karo", "Bari problems ke liye professional bulao"]
  },
  {
    title: "Ghar Ko Organize Karne Ka Tarika Declutter",
    category: "Household", difficulty: "Easy", duration: "20 minutes",
    videoQuery: "ghar organize declutter karne ka tarika urdu",
    steps: ["Ek kamra ek waqt mein handle karo", "Har cheez ke baare mein socho — use hoti hai ya nahi", "Donate, toss, ya rakh lo", "Har cheez ki jagah fix karo", "Har mahine check karo"]
  },
  {
    title: "Baathroom Ki Nali Block Ho Jaye To Kya Karein",
    category: "Household", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "bathroom drain block fix karne ka tarika urdu",
    steps: ["Baking soda aur vinegar dalo nali mein", "10 minute wait karo", "Garam paani dalo", "Plunger use karo agar na khule", "Chemical drain cleaner try karo last mein"]
  },
  {
    title: "Gas Geyser Safe Kaise Rakhen",
    category: "Household", difficulty: "Medium", duration: "15 minutes",
    videoQuery: "gas geyser safe use tips urdu pakistan",
    steps: ["Geyser wali jagah ventilated honi chahiye", "Roz use ke baad gas valve band karo", "Gas ki smell aaye to turant band karo", "Saal mein ek baar servicing karwao", "Carbon monoxide detector lagao"]
  },
  {
    title: "Kapde Dhone Ka Sahi Tarika Washing Machine",
    category: "Household", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "washing machine mein kapde dhone ka tarika urdu",
    steps: ["Rang aur safed kapde alag karo", "Label check karo wash temperature ke liye", "Detergent sahi miqdar mein dalo", "Delicate kapde gentle cycle mein dho", "Turant nikaalo wash ke baad"]
  },

  // ── EDUCATION ──────────────────────────────────────────────
  {
    title: "Exam Ki Taiyari Kaise Karein",
    category: "Education", difficulty: "Medium", duration: "30 minutes",
    videoQuery: "exam ki taiyari kaise karein urdu tips students",
    steps: ["Syllabus dekh kar important topics mark karo", "Roz ka study schedule banao", "Notes short aur points mein banao", "Past papers solve karo", "Revision ke liye 2 din rakhho"]
  },
  {
    title: "Job Interview Ki Taiyari Kaise Karein",
    category: "Education", difficulty: "Medium", duration: "30 minutes",
    videoQuery: "job interview ki taiyari kaise karein urdu",
    steps: ["Company ke baare mein pehle research karo", "Common questions ke jawab tayar karo", "Kapde pehle se prepare karo", "Time pe pohoncho — 10 minute pehle", "Confident raho"]
  },
  {
    title: "English Bolna Kaise Seekhein Beginners",
    category: "Education", difficulty: "Medium", duration: "25 minutes",
    videoQuery: "english bolna kaise seekhein beginners urdu",
    steps: ["Roz 10 naye words yaad karo", "English movies subtitles ke saath dekho", "Khud se mirror ke saamne bolo", "BBC Learning English ya YouTube se practice karo", "Ghalti karne se daro mat"]
  },
  {
    title: "Online Course Se Skill Kaise Seekhein",
    category: "Education", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "online course se skill kaise seekhein urdu free",
    steps: ["Pehle decide karo kya seekhna hai", "YouTube, Coursera, ya Udemy use karo", "Notes zaroor banao", "Roz 30 min bhi kaafi hai", "Seekhi hui cheez practice mein lagao"]
  },
  {
    title: "Bacchon Ko Padhane Ka Asaan Tarika",
    category: "Education", difficulty: "Medium", duration: "20 minutes",
    videoQuery: "bacchon ko padhane ka asaan tarika urdu parents",
    steps: ["Padhai ki jagah quiet aur organized rakho", "Short sessions mein padhao — 20-25 minute", "Real life examples do", "Roz thodi practice karwao", "Tarif karo jab achha kare"]
  },
  {
    title: "Microsoft Word Basic Skills Beginners Guide",
    category: "Education", difficulty: "Easy", duration: "20 minutes",
    videoQuery: "microsoft word basic tutorial urdu beginners",
    steps: ["New document kaise kholein seekho", "Font, size aur color change karna seekho", "Paragraph alignment set karo", "File save karo Ctrl+S se", "PDF mein export karna seekho"]
  },
  {
    title: "Matric Ke Baad Kya Karein Career Guide",
    category: "Education", difficulty: "Medium", duration: "25 minutes",
    videoQuery: "matric ke baad kya karein career guide urdu pakistan",
    steps: ["Apni interest aur strength identify karo", "FSc, FA, ICS, ya vocational compare karo", "Parents aur teachers se mashwara lo", "Online career tests try karo", "Long-term goal socho pehle"]
  },

  // ── WRITING ────────────────────────────────────────────────
  {
    title: "CV Kaise Likhein Beginner Guide",
    category: "Writing", difficulty: "Medium", duration: "25 minutes",
    videoQuery: "CV kaise likhein urdu pakistan beginners",
    steps: ["Naam aur contact info sabse upar likho", "Education detail likho", "Skills clearly mention karo", "Experience ho to add karo", "Ek page se zyada mat karo"]
  },
  {
    title: "Email Professionally Kaise Likhein",
    category: "Writing", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "professional email likhne ka tarika urdu",
    steps: ["Subject clear aur short likho", "Salutation se shuru karo", "Main baat 2-3 lines mein likho", "Politely band karo — Regards/Thanks se", "Bhejne se pehle ek baar parho"]
  },
  {
    title: "Application Kaise Likhein School Office Ke Liye",
    category: "Writing", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "application likhne ka tarika urdu school office",
    steps: ["Date aur receiver ka naam likho upar", "Subject ek line mein likho", "Politely apni request explain karo", "Apna naam aur date neeche likho", "Clear aur simple language use karo"]
  },
  {
    title: "Social Media Post Effective Kaise Likhein",
    category: "Writing", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "social media effective post likhne ka tarika urdu",
    steps: ["Pehli line attention grabbing honi chahiye", "Short rakho — 3-4 lines kaafi hain", "Relevant hashtags add karo", "Call to action zaroor likho", "Image ya video ke saath dalo"]
  },
  {
    title: "Resume Aur CV Mein Kya Farq Hai",
    category: "Writing", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "resume aur CV mein farq kya hai urdu",
    steps: ["Resume short hota hai — 1 page", "CV detailed hoti hai — academic ke liye", "Pakistan mein CV zyada use hoti hai", "Dono mein contact info, education, skills zaroori hain", "Job description dekh ke tailor karo"]
  },

  // ── SCHEDULING ─────────────────────────────────────────────
  {
    title: "Subah Ka Routine Kaise Theek Karein",
    category: "Scheduling", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "subah ka routine theek kaise karein urdu morning habits",
    steps: ["Raat ko sone ka time fix karo", "Alarm ek hi lagao — snooze mat karo", "Subah phone mat dekho pehle 30 minute", "Paani piyo aur halki walk karo"]
  },
  {
    title: "Bachon Ki Daily Routine Kaise Banayein",
    category: "Scheduling", difficulty: "Medium", duration: "20 minutes",
    videoQuery: "bachon ki daily routine kaise banayein urdu parenting",
    steps: ["Subah uthne aur sone ka time fix karo", "School aur homework ka time alag karo", "Khel ka waqt zaroor rakho", "Screen time limit karo", "Weekend routine thodi flexible rakho"]
  },
  {
    title: "Time Management Kaise Improve Karein",
    category: "Scheduling", difficulty: "Medium", duration: "20 minutes",
    videoQuery: "time management kaise improve karein urdu tips",
    steps: ["Roz subah 3 important kaam list karo", "Pehle mushkil kaam karo", "Phone notifications band karo kaam ke waqt", "Har kaam ka time limit rakho", "Raat ko agle din ki planning karo"]
  },
  {
    title: "Weekly Plan Kaise Banayein Planner Guide",
    category: "Scheduling", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "weekly plan kaise banayein urdu productivity",
    steps: ["Itwaar ko agli hafte ki planning karo", "Kaam ko priority ke hisaab se list karo", "Ahem appointments pehle fix karo", "Free time bhi schedule mein rakhho", "Sham ko din ka jaiza lo"]
  },
  {
    title: "Ghar Aur Kaam Ka Balance Kaise Rakhen",
    category: "Scheduling", difficulty: "Medium", duration: "20 minutes",
    videoQuery: "work life balance kaise rakhen urdu tips",
    steps: ["Kaam ke gante fix karo", "Family ke liye time schedule mein likho", "Breaks zaroor lo kaam ke doran", "Chhutti ka din kaam se door rakho", "Ek kaam ek waqt — multitasking se bachao"]
  },

  // ── HEALTH ─────────────────────────────────────────────────
  {
    title: "Stress Aur Tension Kam Karne Ke Tarike",
    category: "Health", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "stress aur tension kam karne ke tarike urdu",
    steps: ["Gehri sansein lo — 4 second andar, 4 bahar", "Apni problem likho kagaz pe", "Kisi dost ya family se baat karo", "15 minute bahar chalo ya exercise karo"]
  },
  {
    title: "Neend Na Aaye To Kya Karein",
    category: "Health", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "neend na aaye to kya karein urdu insomnia tips",
    steps: ["Sone se 1 ghanta pehle phone band karo", "Kamra thanda aur andhera rakho", "Chai ya coffee raat ko mat piyo", "Halka music ya Quran sunno", "Subah uthne ka time fix karo"]
  },
  {
    title: "Anxiety Aur Ghabrahat Kam Kaise Karein",
    category: "Health", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "anxiety aur ghabrahat kam kaise karein urdu",
    steps: ["Gehri saans lo — 5 baar", "Jo dar raha hai use likho kagaz pe", "Ek ek step socho — puri problem ek saath nahi", "Kisi trusted insaan se baat karo", "Professional help lene se mat daro"]
  },
  {
    title: "Social Media Ka Zyada Use Kam Kaise Karein",
    category: "Health", difficulty: "Easy", duration: "10 minutes",
    videoQuery: "social media zyada use kam kaise karein urdu digital detox",
    steps: ["Phone pe screen time limit lagao", "Apps ke notifications band karo", "Sone se pehle phone door rakh do", "Social media ki jagah koi hobby shuru karo"]
  },
  {
    title: "Roz Exercise Karne Ki Aadat Kaise Daalen",
    category: "Health", difficulty: "Easy", duration: "15 minutes",
    videoQuery: "roz exercise karne ki aadat kaise daalen urdu",
    steps: ["Chote se shuru karo — 10 minute bhi theek hai", "Subah ka waqt best hota hai", "Koi sport ya activity choose karo jo pasand ho", "Friend ke saath karo", "Results track karo"]
  },
  {
    title: "Pani Zyada Piye Fayde Aur Tips",
    category: "Health", difficulty: "Easy", duration: "8 minutes",
    videoQuery: "pani zyada pine ke fayde aur tips urdu",
    steps: ["Subah uthte hi ek glass pani piyo", "Phone pe reminder set karo har 2 ghante mein", "Paani ki bottle hamesha saath rakho", "Chai ya cold drink ki jagah pani choose karo", "8 glass roz ka target rakho"]
  },
  {
    title: "Sar Dard Ho To Ghar Mein Kya Karein",
    category: "Health", difficulty: "Easy", duration: "8 minutes",
    videoQuery: "sar dard ka ghar mein ilaj urdu headache",
    steps: ["Paani piyo — aksar dehydration ki wajah se hota hai", "Andheri aur quiet jagah mein lete jao", "Sar ya gardan pe thandi ya garam sikai karo", "Aankhon ko rest do — screen band karo", "Baar baar ho to doctor se milo"]
  },
  {
    title: "Motapa Kam Karne Ka Sahi Tarika",
    category: "Health", difficulty: "Hard", duration: "30 minutes",
    videoQuery: "motapa kam karne ka sahi tarika urdu weight loss",
    steps: ["Diet aur exercise dono saath zaroori hain", "Processed aur fried food kam karo", "Roz 30 minute walk karo", "Raat ko gehra khana mat khao", "Doctor ya nutritionist se plan banwao"]
  }
];

module.exports = tutorials;