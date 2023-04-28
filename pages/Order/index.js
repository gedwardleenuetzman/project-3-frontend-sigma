export default function index() {
    return <></>
}

export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/Order/PlaceOrder',
        permanent: true,
      },
    };
  }