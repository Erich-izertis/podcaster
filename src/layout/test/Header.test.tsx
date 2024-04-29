import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';

import Header from '../Header';
import { useIsFetching } from "@tanstack/react-query";
import PodcastApiProvider from "../../services/ApiProvider.tsx";

vitest.mock("@tanstack/react-query", async () => ({
	...(await vitest.importActual("@tanstack/react-query")),
	useIsFetching: vitest.fn(),
}));

// Función auxiliar para renderizar el componente dentro del proveedor de React Query
function renderHeader() {
	return render(
		<PodcastApiProvider>
			<Header />
		</PodcastApiProvider>
	);
}

describe('Header', () => {
	const mockUseIsFetching = vitest.fn();

	beforeEach(() => {
		// @ts-ignore
		useIsFetching.mockImplementation(mockUseIsFetching);
	});

	afterEach(() => {
		vitest.clearAllMocks();
	});

	it('debe mostrar el título del sitio', () => {
		renderHeader();
		expect(screen.getByText(/Podcaster/i)).toBeInTheDocument();
	});

	it('debe mostrar un ícono de carga cuando está buscando datos', () => {
		mockUseIsFetching.mockReturnValue(1);
		renderHeader();
		expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
	});

	it('no debe mostrar un ícono de carga cuando no está buscando datos', () => {
		mockUseIsFetching.mockReturnValue(0);
		renderHeader();
		expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
	});
});
