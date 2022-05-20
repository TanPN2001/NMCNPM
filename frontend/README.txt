Đối với Web
Cấu trúc file trong folder src:
C:.
│   App.css
│   App.js
│   App.test.js
│   index.css
│   index.js
│   logo.svg
│   reportWebVitals.js
│   setupTests.js
├───Modules
│   ├───Admin
│   │   ├───Dashboard
│   │   │   ├───Billing_History
│   │   │   ├───Pending_Account
│   │   │   └───UserInfo
│   │   └───ListEmployee
│   │       ├───AddAndEditEmployee
│   │       ├───Content
│   │       ├───ListRe
│   │       └───SearchBar
│   ├───Auth
│   │   ├───Login
│   │   └───screens
│   ├───Receptionist
│   │   ├───Dashboard
│   │   │   ├───BillingHistory
│   │   │   ├───PendingAccount
│   │   │   └───UserInfo
│   │   ├───Pending
│   │   │   ├───Content
│   │   │   ├───PendingHistory
│   │   │   └───SearchBar
│   │   └───VerifyAccount
│   └───Staff
│       └───ListStation
├───Services
└───shared
    ├───icons
    ├───images
    ├───Layout
    │   ├───AdminSidebar
    │   └───SearchBar
    └───utils

Những folder chung thì hãy bỏ vào 
Tất cả các class phải được viết hoa tất cả các chữ cái đầu: 
vd:
	Class ListComponent extend React.element {
	
	}
Các method viết thường chữ cái đầu tiên của từ đầu tiên, sau đó tuân theo quy tắc viết hoa
	Class ListComponent extend React.element {
		countUser() {
		
		}
	}
Các file được viết lặp đi lặp lại ở nhiều phần thì nên tạo ra component để gọi cho nhanh,
hạn chế việc code cứng (tức là các hàm xử lý  về một việc nhất định, chỉ sử dụng việc đó 1 lần) 
trong các component ở các folder share để có thể sử dụng lại được. Nên pass các hàm xử lý vào các component này

