export default function index() {
    return <></>
}

export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/Manage/ManagerHome',
        permanent: true,
      },
    };
  }