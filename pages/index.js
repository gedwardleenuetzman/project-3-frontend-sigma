import React from 'react';

import { Typography, Pagination, Grid, Box, Button, Container, Paper, Card } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import RouteDetailer from 'src/RouteDetailer'

import MANAGE_ROUTE_DRAWER_LAYOUT from 'src/DrawerLayouts/Manage'

const Home = () => {
  const [tags, setTags] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      setTags(await (await fetch(`/api/manage/user/gettags`)).json())
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      
      <StandardAppBar title="Home" tags={tags} layout={MANAGE_ROUTE_DRAWER_LAYOUT} />

      <Box sx={{ display: 'flex', height: '100%', m: 3 }}>
        <Box sx={{ width: '50%', height: '100%' }}>
          <Card sx={{p: 2}}>
            <div className="logo">
              <p align="center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Chick-fil-A_Logo.svg" style={{ maxWidth: '100%', height: 'auto' }} />
              </p>
            </div>
            <div>
              <h1 align="center">Welcome to Chick-Fil-A!</h1>
              <p align="center">Atlanta-based Chick-fil-A, Inc. is a family owned and privately held restaurant company founded in 1964 by S. Truett Cathy. Devoted to serving the local communities in which its franchised restaurants operate, and known for its original chicken sandwich, Chick-fil-A serves freshly prepared food.</p>
              <p align="center">Visit us today at one of our many locations, and enjoy a tasty meal that will leave you satisfied and wanting more!</p>
            </div>
          </Card>
        </Box>
        <Box sx={{ ml: 3, width: '50%' }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d54925.97740322061!2d-96.38542732064194!3d30.63752001205226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1schick%20fil%20a!5e0!3m2!1sen!2sus!4v1682797802748!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: "0", borderRadius: "1%" }}
            loading="lazy"
            >
          </iframe>
        </Box>
      </Box>

      <Box sx={{m: 3}}>
        <RouteDetailer layout={[
          {  
              title: "Order", 
              desc: "Order something from one of our restaurants right now!", 
              route: "/Order/Customer", 
              image: ""
          },
        ]}/>
      </Box>

    </React.Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     console.log('no sesh', session)
//     return {
//       props: {
//         tags: [],
//       }
//     };
//   }

//   console.log('yes sesh')

//   const user = await Models.Users.findOne({ where: { email: session.user.email } })

//   let tags = []

//   if (user.manager_permissions) {
//     tags.push('manage')
//   }

//   if (user.server_permissions) {
//     tags.push('server')
//   }

//   return {
//     props: {
//       tags: tags,
//     },
//   };
// }

export default Home
