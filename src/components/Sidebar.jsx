import { Boxes, ChevronDown, ChevronRight, FileText, LayoutDashboard, LineChart, Mail, Package, Settings, Shield, ShoppingBag, Tags, UserPlus, Users } from "lucide-react"
import { useState } from "react"


const Sidebar = ({ onCloseDrawer }) => {
    const [links, setLinks] = useState([
        {name: "Dashboard", icon: LayoutDashboard, active: true},
        {name: "Analtics", icon: LineChart, active: false},
        {name: "Reports", icon: FileText, active: false},
        {name: "Users", icon: Users, active: false, open: true,
            children: [
                {name: "All Users", icon: Users},
                {name: "Add New", icon: UserPlus},
                {name: "Roles & Permissions", icon: Shield},
            ]
        },
        {name: "Products", icon: ShoppingBag, active: false, open: false,
            children: [
                {name: "All Products", icon: Package},
                {name: "Categories", icon: Tags},
                {name: "Inventory", icon: Boxes},
            ],

        },
        {name: "Messages", icon: Mail, active: false, badge: 3},
        {name: "Settings", icon: Settings, active: false},
    ]);

    const handleClick = (index) => {
        setLinks(prev => prev.map((link, i) => {
            if (i === index ) {
                if (link.children) {
                    return {...link, open: !link.open};
                }
                return {...link, active: true};
            }
            return link.children ? {...link, active: false} : {...link, active: false};
        }));
    };

  return (
    <aside className="fixed left-4 top-4 h-[calc(100%-2rem)] bg-gray-900 overflow-hidden
    rounded-xl shadow-2xl w-72 z-20 lg:mt-0 mt-14">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-white">
                    LumiBoard
                </h1>
            </div>
        </div>
        {/* Navigation */}
        <nav className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
            <ul className="space-y-1">
                {links.map((link, index) => (
                    <li key={index}>
                        <button onClick={() => handleClick(index)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5
                            rounded-xl transition-all duration-200 group ${
                                link.active
                                ? `bg-[#ece883]/20 text-[#ece883] border-l-2 border-[#ece883]`
                                : `text-gray-300 hover:bg-white/10`
                            }`}>
                                <span className="flex-1 text-left text-sm font-medium">{link.name}</span>
                                {link.badge && (
                                    <span className="bg-[#ece883] text-gray-900 text-xs px-2 py-0.5 rounded-full
                                    font-semibold">
                                        {link.badge}
                                    </span>
                                )}
                                {link.children && (
                                    <span className="text-[#ece883]">
                                        {link.open
                                        ? <ChevronDown className="h-4 w-4"/>
                                        : <ChevronRight className="h-4 w-4"/>}
                                    </span>
                                )}                            
                        </button>
                        {link.children && link.open && (
                            <ul className="ml-6 mt-1 space-y-1 border-l-2 border-white/10 pl-3">
                                {link.children.map((child, childIndex) => (
                                    <li key={childIndex}>
                                        <button
                                        onClick={() => {
                                            handleClick(index);
                                            if (onCloseDrawer && window.innerWidth < 768) onCloseDrawer();
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                                        text-gray-300 hover:bg-white/10 transition-colors">
                                            <child.icon className="w-4 h-4 text-[#ece883]"/>
                                            <span>{child.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    </aside>
  )
}

export default Sidebar