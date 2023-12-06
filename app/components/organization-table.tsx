import React from 'react';
import {Table, Tag} from "@navikt/ds-react";
import {Link} from "@remix-run/react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import organisations from "~/data/organisation";

const OrganizationTable = ({ data }) => {
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Asset Id</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Org Number</Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}>View</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row, index) => (
                    <Table.Row key={index}>
                        <Table.HeaderCell scope="row">{row.displayName}</Table.HeaderCell>
                        <Table.DataCell>{row.primaryAssetId}</Table.DataCell>
                        <Table.DataCell>{row.orgNumber}</Table.DataCell>
                        <Table.DataCell>
                            <Link to={`/organization/${row.orgNumber}`}>
                                <InformationSquareIcon title="a11y-title" fontSize="1.5rem" />
                            </Link>
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default OrganizationTable;