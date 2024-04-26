import darkLogo from "@/public/assets/images/logo_dark.png"
import logo from "@/public/assets/images/logo_light.png"
import Image from 'next/image'

const ApplicationLogo = props => (
    <Image src={props.logo == 'dark' ? darkLogo : logo} {...props} alt="Logo" />
)

export default ApplicationLogo
