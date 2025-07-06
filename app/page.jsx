import Link from 'next/link';

export default function Page() {
    return (
        <>
            <div>
                <ul>
                    <li id={"1"}>
                        <Link href={'search-roblox'}>
                            <p>
                                {"Search David's Hard Drive"}
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
            <p>I gutted everything!</p>
        </>
    );
}


