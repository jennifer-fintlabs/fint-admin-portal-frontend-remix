import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {InternalHeader, Search, Spacer} from "@navikt/ds-react";
import {ComponentIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import ComponentAdd from "~/components/component-add";
import type {IComponent} from "~/api/types";
import {fetchComponents} from "~/api/contact";

// Styled InternalHeader
const StyledInternalHeader = styled(InternalHeader)`
  --ac-internalheader-bg: var(--a-surface-inverted);
  --ac-internalheader-divider: var(--a-gray-600);
  --ac-internalheader-text: var(--a-text-on-inverted);
  --ac-internalheader-hover-bg: var(--a-surface-inverted-hover);
  --ac-internalheader-active-bg: var(--a-surface-inverted-active);

`;

const ComponentPage = () => {
    const componentEditRef = useRef<HTMLDialogElement>(null);
    const [filteredData, setFilteredData] = useState<IComponent[]>([])
    const [components, setComponents] = useState<IComponent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const componentsData = await fetchComponents();
            if (componentsData) {
                setComponents(componentsData);
                setFilteredData(componentsData);
            }
        };

        fetchData();
    }, []);


    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the contact add form inside index");
        componentEditRef?.current?.close();
    };

    const handleSearchInput = (input:any) => {
        const filtered = components.filter(
            (row) =>
                row.name.toLowerCase().includes(input.toLowerCase()) ||
                row.description.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered)
    }

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <ComponentAdd
                ref={componentEditRef}
                headerText="Add New Component Form"
                onClose={handleFormClose}
            />

            <StyledInternalHeader>

                <InternalHeader.Button onClick={() => componentEditRef.current?.showModal()}>
                    <ComponentIcon title="a11y-title" fontSize="1.5rem"/>Add New
                </InternalHeader.Button>

                <Spacer />

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
            </StyledInternalHeader>

            <ComponentsTable data={filteredData} />
        </div>
    );
};

export default ComponentPage;
