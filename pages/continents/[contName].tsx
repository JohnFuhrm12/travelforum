import { useRouter } from "next/router";

export default function country() {
    const router = useRouter();
    const {contName} = router.query;

    return (
        <h1>Hello {contName}</h1>
    )
}