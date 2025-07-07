import Link from 'next/link';

export default function Page() {
    return (
        <>
            <div>
                <h1>{"There's nothing on this page."}</h1>
                <h3>Click the link below to search.</h3>
                <ul>
                    <li id={"1"}>
                        <Link href={'search-roblox'}>
                            <p>
                                {"Search"}
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>

        </>
    );
}


