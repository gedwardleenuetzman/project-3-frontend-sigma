export default function index() {
    return <></>
}

export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/Manage/Manage',
        permanent: true,
      },
    };
  }