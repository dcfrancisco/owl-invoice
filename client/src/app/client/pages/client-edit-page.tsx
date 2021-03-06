import React, { Component } from 'react';
import { Client } from '../client';
import ClientForm from '../client-form/client-form';
import QueryPanel from '../../../common/query/query-panel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import ClientRemoveDialog from '../client-remove-dialog/client-remove-dialog';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { CLIENT_GET_QUERY, CLIENT_UPDATE_MUTATION } from '../client-queries';


interface Response {
    client: Client;
};

interface ClientEditPageProps extends RouteComponentProps<any> {
}

interface ClientEditPageState {
    isRemoveDialogOpen: boolean;
}

class ClientEditPage extends Component<ClientEditPageProps, ClientEditPageState> {
    state: ClientEditPageState = {
        isRemoveDialogOpen: false
    };

    showRemoveItemDialog = () => {
        this.setState({
            isRemoveDialogOpen: true
        });
    };

    closeRemoveDialog = () => {
        this.setState({
            isRemoveDialogOpen: false
        });
    };

    redirectToList = (resp: any) => {
        this.props.history.push('/clients');
    };

    redirectToClone = (id: string) => {
        this.props.history.push(`/clients/${encodeURIComponent(id)}/clone`);
    };

    render() {
        return (
            <QueryPanel<Response> query={CLIENT_GET_QUERY} variables={{ id: this.props.match.params.id }}>
                {(data) =>
                    (
                        <React.Fragment>
                            <BreadcrumbsItem to={`/clients/${encodeURIComponent(data.client.id)}`}>{data.client.name}</BreadcrumbsItem>
                            <ClientForm
                                client={data.client}
                                mutation={CLIENT_UPDATE_MUTATION}
                                successMessage="Client has been successfully updated"
                                onSuccess={this.redirectToList}
                                menuRender={(closeMenu: () => void) => [
                                    <MenuItem key="remove" onClick={() => { this.showRemoveItemDialog(); closeMenu(); }}>Remove</MenuItem>,
                                    <MenuItem key="clone" onClick={() => { this.redirectToClone(data.client.id); closeMenu(); }}>Clone</MenuItem>,
                                ]}
                            />
                            <ClientRemoveDialog
                                open={this.state.isRemoveDialogOpen}
                                item={data.client}
                                onClose={this.closeRemoveDialog}
                                onSuccess={this.redirectToList}
                            />
                        </React.Fragment>
                    )
                }
            </QueryPanel>

        );
    }
};

export default withRouter(ClientEditPage);