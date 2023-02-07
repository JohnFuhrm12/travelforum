import { useRouter } from "next/router";
import Navbar from '../../components/navbar';

export default function continent() {
    const router = useRouter();
    const {contName} = router.query;

    return (
        <>
        <Navbar/>
        <h1>Hello {contName}</h1>
        </>
    )
}
