import db from '@/models';
const { Link } = db;

export default function RedirectPage() {
    return null;
}

export async function getServerSideProps({ params, res }) {
    const { shortCode } = params;
    try {
        const link = await Link.findOne({ where: { shortLink: shortCode } });
        if (!link) {
            return {
                redirect: {
                    destination: '/404',
                    permanent: false,
                },
            };
        }

        await link.update(
            { clickCount: link.clickCount + 1 },
            { where: { shortLink: shortCode } }
        );

        return {
            redirect: {
                destination: link.originalLink,
                permanent: false,
            },
        };
    } catch (error) {
        console.error('Error en redirección:', error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };

    }
}