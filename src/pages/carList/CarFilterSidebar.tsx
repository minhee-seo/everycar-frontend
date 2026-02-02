import React from 'react';
import styles from './CarList.module.scss';

interface FilterProps {
    onFilterChange: (filters: any) => void;
    filters: {
        searchName: string;
        maxPrice: number;
        grades: string[];
        categories: string[];
    };
}

const CarFilterSidebar = ({ onFilterChange, filters }: FilterProps) => {
    
    const handleCheckbox = (type: 'grades' | 'categories', value: string) => {
        const currentList = filters[type];
        const newList = currentList.includes(value)
            ? currentList.filter(item => item !== value)
            : [...currentList, value];
        onFilterChange({ ...filters, [type]: newList });
    };

    return (
        <aside className={styles.filterSidebar}>
            <h2 className={styles.filterTitle}>차량검색</h2>
            <ul className={styles.filterList}>
                {/* 모델명 검색 */}
                <li className={styles.filterItem}>
                    <h3>자동차 모델 검색</h3>
                    <div className={styles.modelSearch}>
                        <input 
                            type="text" 
                            placeholder='모델명을 입력하세요' 
                            value={filters.searchName}
                            onChange={(e) => onFilterChange({ ...filters, searchName: e.target.value })}
                        />
                    </div>
                </li>

                {/* 등급 필터 */}
                <li className={styles.filterItem}>
                    <h3>등급</h3>
                    <ul className={styles.checkboxGroup}>
                        {['Premium', 'Standard'].map(grade => (
                            <li key={grade}>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filters.grades.includes(grade)}
                                        onChange={() => handleCheckbox('grades', grade)}
                                    /> {grade}
                                </label>
                            </li>
                        ))}
                    </ul>
                </li>

                {/* 차급 필터 */}
                <li className={styles.filterItem}>
                    <h3>차급</h3>
                    <ul className={styles.checkboxGroup}>
                        {['경차', '소형', '준중형', '중형', '대형', 'SUV'].map(cat => (
                            <li key={cat}>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filters.categories.includes(cat)}
                                        onChange={() => handleCheckbox('categories', cat)}
                                    /> {cat}
                                </label>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </aside>
    );
};

export default CarFilterSidebar;