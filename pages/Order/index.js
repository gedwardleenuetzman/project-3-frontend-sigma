export default function index() {
  return <></>
}

/**
 * 
 * @returns Goes straight to place order page. 
 */
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/Order/PlaceOrder',
      permanent: true,
    },
  };
}
