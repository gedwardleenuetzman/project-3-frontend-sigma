import React from 'react';

import { Box, Card, FormGroup, FormControlLabel, Switch } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'

import MANAGE_ROUTE_DRAWER_LAYOUT from 'src/DrawerLayouts/Manage'

const fetchProfile = async () =>
	await (await fetch(`/api/manage/user/getprofile`)).json()

const updateSettings = async (form) => {
    fetch(`/api/manage/user/setsettings`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(form)
    })
}

const Settings = () => {
    const [state, setState] = React.useState({
        manager_permissions: false,
        server_permissions: false,
    })

    React.useEffect(() => {
        const fetchData = async () => {
            const profile = await fetchProfile()

            setState({
                manager_permissions: profile.manager_permissions,
                server_permissions: profile.server_permissions,
            })
        };
      
        fetchData();
    }, []);

    const handleChange = (event) => {
        console.log('change')

        let form = {...state, [event.target.name]: event.target.checked}

        updateSettings(form);
        setState(form);
    };

    const tags=[]

    if (state.manager_permissions) {
        tags.push('manager')
    }

    if (state.server_permissions) {
        tags.push('server')
    }

	return (
		<React.Fragment>
			<StandardAppBar tags={tags} title="Settings" layout={MANAGE_ROUTE_DRAWER_LAYOUT} />

            <Box sx={{m: 2}}>
                <Card sx={{mb: 2, pl: 2, pt: 1, pb: 1 }}>
                    <FormGroup>
                        <FormControlLabel 
                            required 
                            control={
                                <Switch 
                                    checked={state.manager_permissions} 
                                    onChange={handleChange}
                                    name="manager_permissions"
                                />
                            } 
                            label="Manager"     
                        />
                    </FormGroup>
                </Card>
                
                <Card sx={{mb: 2, pl: 2, pt: 1, pb: 1 }}>
                    <FormGroup>
                        <FormControlLabel 
                            required 
                            control={
                                <Switch 
                                    checked={state.server_permissions} 
                                    onChange={handleChange}
                                    name="server_permissions"
                                />
                            } 
                            label="Server"     
                        />
                    </FormGroup>
                </Card>
            </Box>

		</React.Fragment>
	)
}

export default Settings