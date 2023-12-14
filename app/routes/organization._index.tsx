import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {InternalHeader, Search, Spacer} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import organisations from '~/api/organisations';
import OrganizationTable from "~/components/organization-table";
import {PersonPlusIcon} from "@navikt/aksel-icons";
import React, {useEffect, useRef, useState} from "react";
import CustomFormModal from "~/components/organization-add";
import type {IOrganization} from "~/api/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Portal Dashboard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: navStyles }
]

export default function OrganizationPage() {
    const organizationEditRef = useRef<HTMLDialogElement>(null);
    const [filteredData, setFilteredData] = useState<IOrganization[]>([])

    //TODO: make type correct after API connection
    useEffect(() => {
        setFilteredData(organisations);
    }, []);

    const handleSearchInput = (input:any) => {
        const filtered = organisations.filter(
            (row) =>
                row.name.toLowerCase().includes(input.toLowerCase()) ||
                row.displayName.toLowerCase().includes(input.toLowerCase()) ||
                row.orgNumber.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered)
    };

    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the organization add form inside index");
        organizationEditRef.current?.close();
    }

        return (
            <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
                <CustomFormModal
                    ref={organizationEditRef}
                    headerText="Add New organization Form"
                    onClose={handleFormClose}
                    selectedOrganization={null}
                />


                <InternalHeader>
                    <InternalHeader.Button onClick={() => organizationEditRef.current?.showModal()}>
                        <PersonPlusIcon title="a11y-title" fontSize="1.5rem"/>Add New
                    </InternalHeader.Button>
                    <Spacer/>

                    <form
                        className="self-center px-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Search!");
                        }}
                    >
                        <Search
                            label="InternalHeader søk"
                            size="medium"
                            variant="simple"
                            placeholder="Søk"
                            onChange={handleSearchInput}
                        />
                    </form>


                </InternalHeader>

                <OrganizationTable data={filteredData}/>

            </div>
        );
    }
