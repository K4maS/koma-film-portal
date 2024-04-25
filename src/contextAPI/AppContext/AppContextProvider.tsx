import React, { useState, createContext, ReactNode } from 'react';

interface PageContextType {
	currentPage: number;
	changeCurrentPage: (page: number) => void | undefined;
}

export const PageContext = createContext<PageContextType | null>(null);

interface AppContextProviderProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
	const [currentPage, setCurrentPage] = useState(0);
	const changeCurrentPage = (page: number) => {
		setCurrentPage(page - 1);
	};
	return (
		<PageContext.Provider value={{ currentPage, changeCurrentPage }}>
			{children}
		</PageContext.Provider>
	);
}
