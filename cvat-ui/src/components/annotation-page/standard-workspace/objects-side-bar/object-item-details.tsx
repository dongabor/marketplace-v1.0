// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row } from 'antd/lib/grid';
import Collapse from 'antd/lib/collapse';

import ItemAttribute from './object-item-attribute';

interface Props {
    readonly: boolean;
    collapsed: boolean;
    attributes: any[];
    values: Record<number, string>;
    changeAttribute(attrID: number, value: string): void;
    collapse(): void;
}

export function attrValuesAreEqual(next: Record<number, string>, prev: Record<number, string>): boolean {
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);

    return (
        nextKeys.length === prevKeys.length &&
        nextKeys.map((key: string): boolean => prev[+key] === next[+key]).every((value: boolean) => value)
    );
}

function attrAreTheSame(prevProps: Props, nextProps: Props): boolean {
    return (
        nextProps.readonly === prevProps.readonly &&
        nextProps.collapsed === prevProps.collapsed &&
        nextProps.attributes === prevProps.attributes &&
        attrValuesAreEqual(nextProps.values, prevProps.values)
    );
}

function ItemAttributesComponent(props: Props): JSX.Element {
    const {
        collapsed, attributes, values, readonly, changeAttribute, collapse,
    } = props;

    const sorted = [...attributes].sort((a: any, b: any): number => a.inputType.localeCompare(b.inputType));

    return (
        <Row>
            <div>
                {sorted.map(
                    (attribute: any): JSX.Element => (
                        <Row>
                            <div style={{ fontSize: '15px' }}>
                                {attribute.name}
                            </div>
                            <div style={{ marginLeft: '10px', fontSize: '15px', fontWeight: 'bold' }}>
                                {values[attribute.id]}
                            </div>
                        </Row>
                    ),
                )}
            </div>
        </Row>
    );
}

export default React.memo(ItemAttributesComponent, attrAreTheSame);
