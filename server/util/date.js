function getCurrent() {
	const datetime = new Date();
    return datetime.toISOString().slice(0,10);
}

module.exports = { getCurrent };