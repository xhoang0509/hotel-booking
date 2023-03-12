import { useRouter } from 'next/router';

export default function UserId() {
    const router = new useRouter();
    const { id } = router.query;

    return <div>User ID: {id}</div>;
}
