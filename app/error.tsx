"use client";

import Container from "@/components/container";

function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <Container>{error.message}</Container>;
}

export default ErrorPage;
