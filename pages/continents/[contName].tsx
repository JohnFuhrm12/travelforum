import { useRouter } from "next/router";
import Head from "next/head";

export default function continent() {
    const router = useRouter();
    const {contName} = router.query;

    return (
        <>
        <Head>
            <title></title>
        </Head>
        <h1>Hello {contName}</h1>
        </>
    )
}
