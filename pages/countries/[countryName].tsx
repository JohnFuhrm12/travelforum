import { useRouter } from "next/router";

export default function country() {
    const router = useRouter();
    const {countryName} = router.query;

    return (
        <h1>Hello {countryName}</h1>
    )
}