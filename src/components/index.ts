import dynamic from "next/dynamic";

//icons
const SunIcon = dynamic(()=> import("./@icons/SunIcon"))
const MoonIcon = dynamic(()=> import("./@icons/MoonIcon"))
const ArrowIcon = dynamic(()=> import("./@icons/ArrowIcon"))
const TwitterIcon = dynamic(()=> import("./@icons/TwitterIcon"))
const DiscordIcon = dynamic(()=> import("./@icons/DiscordIcon"))
const ExchangeIcon = dynamic(()=> import("./@icons/ExchangeIcon"))
const MenuIcon = dynamic(()=> import("./@icons/MenuIcon"))
const CloseIcon = dynamic(()=> import("./@icons/CloseIcon"))
const MenuCloseIcon = dynamic(()=> import("./@icons/MenuCloseIcon"))
const DownloadIcon = dynamic(()=> import("./@icons/DownloadIcon"))
//atoms
const DropdownButton = dynamic(()=> import("./atoms/DropdownButton"))
const DropdownItem = dynamic(()=> import("./atoms/DropdownItem"))
const NumberInput = dynamic(()=> import("./atoms/NumberInput"))
const TextInput = dynamic(()=> import("./atoms/TextInput"))
const Button = dynamic(()=> import("./atoms/Button"))
const CheckBox = dynamic(()=> import("./atoms/CheckBox"))
const LoadAnimation = dynamic(()=> import("./atoms/LoadAnimation"))
const LoadCircle = dynamic(()=> import("./atoms/LoadCircle"))
const TabBarItem = dynamic(()=> import("./atoms/TabBarItem"))
const Underline = dynamic(()=> import("./atoms/Underline"))
//molecules
const PageHead = dynamic(()=> import("./molecules/PageHead"))
const Logo = dynamic(()=> import("./molecules/Logo"))
const ThemeChanger = dynamic(()=> import("./molecules/ThemeChanger"))
const Dropdown = dynamic(()=> import("./molecules/Dropdown"))
const ButtonBar = dynamic(()=> import("./molecules/ButtonBar"))
const NavItem = dynamic(()=> import("./molecules/NavItem"))
const TabBar = dynamic(()=> import("./molecules/TabBar"))
const ListItem = dynamic(()=> import("./molecules/ListItem"))
const ScrollItem = dynamic(()=> import("./molecules/ScrollItem"))
const Modal = dynamic(()=> import("./molecules/Modal"))
const GalleryItem = dynamic(()=> import("./molecules/GalleryItem"))
const GallerySidebar = dynamic(()=> import("./molecules/GallerySidebar"))
const CustomCursor = dynamic(()=> import("./molecules/CustomCursor"), { ssr: false })
const CollabItem = dynamic(()=> import("./molecules/CollabItem"))
const Menu = dynamic(() => import("./molecules/Menu"))
const InventoryItem = dynamic(() => import("./molecules/InventoryItem") )
const InventoryTabNav = dynamic(() => import("./molecules/InventoryTabNav") )
//organisms
const Header = dynamic(()=> import("./organisms/Header"))
const Footer = dynamic(()=> import("./organisms/Footer"))
const Navigation = dynamic(()=> import("./organisms/Navigation"))
const StepContainer = dynamic(()=> import("./organisms/StepContainer"))
const Form = dynamic(() => import("./organisms/Form") )
const MobileDisplay = dynamic(() => import("./organisms/MobileDisplay") )
const Gallery = dynamic(() => import("./organisms/Gallery") )
const Collab = dynamic(() => import("./organisms/Collab") )
const InventoryTabs = dynamic(() => import("./organisms/InventoryTabs") )
const InventoryItems = dynamic(() => import("./organisms/InventoryItems") )
//templates
const PageLayout = dynamic(()=> import("./templates/PageLayout"))
const DownloadView = dynamic(()=> import("./templates/DownloadView"))

export {
  PageHead,
  Logo,
  Header, 
  Footer,
  PageLayout,
  SunIcon,
  MoonIcon,
  ThemeChanger,
  StepContainer,
  Dropdown,
  DropdownButton,
  ArrowIcon,
  DropdownItem,
  NumberInput,
  TextInput,
  CheckBox,
  Button,
  DownloadView,
  LoadAnimation,
  Form,
  MobileDisplay,
  TwitterIcon,
  DiscordIcon,
  LoadCircle,
  ButtonBar,
  Navigation,
  MenuIcon,
  NavItem,
  TabBarItem,
  TabBar,
  ListItem,
  ScrollItem,
  ExchangeIcon,
  CloseIcon,
  MenuCloseIcon,
  Modal,
  GalleryItem,
  GallerySidebar,
  CustomCursor,
  Gallery,
  Collab,
  CollabItem,
  Underline,
  Menu,
  InventoryTabs,
  InventoryItem,
  DownloadIcon,
  InventoryItems,
  InventoryTabNav
}
