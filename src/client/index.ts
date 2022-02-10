function testinsert() {
    fetch('/test', { method: 'POST' }).then(res => console.log(res.body))
}

window.testinsert = testinsert