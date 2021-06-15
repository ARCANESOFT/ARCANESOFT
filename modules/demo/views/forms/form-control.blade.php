@extends('demo::_template.master')

@section('content')
    <div class="card">
        <div class="card-body">
            <h3>Example</h3>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>

        <div class="card-body">
            <h3>Sizing</h3>
            <input class="form-control form-control-lg mb-2" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example">
            <input class="form-control mb-2" type="text" placeholder="Default input" aria-label="deafult input example">
            <input class="form-control form-control-sm mb-2" type="text" placeholder=".form-control-sm" aria-label=".form-control-sm example">
        </div>

        <div class="card-body">
            <h3>Readonly</h3>

            <input class="form-control" type="text" placeholder="Readonly input here..." aria-label="readonly input example" readonly>
        </div>

        <div class="card-body">
            <h3>Readonly plain text</h3>

            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword">
                </div>
            </div>

            <form class="row g-3">
                <div class="col-auto">
                    <label for="staticEmail2" class="sr-only">Email</label>
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com">
                </div>
                <div class="col-auto">
                    <label for="inputPassword2" class="sr-only">Password</label>
                    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
                </div>
                <div class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
                </div>
            </form>
        </div>

        <div class="card-body">
            <h3>Color</h3>
            <label for="exampleColorInput" class="form-label">Color picker</label>
            <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">
        </div>

        <div class="card-body">
            <h3>Datalists</h3>
            <label for="exampleDataList" class="form-label">Datalist example</label>
            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
            <datalist id="datalistOptions">
                <option value="San Francisco">
                <option value="New York">
                <option value="Seattle">
                <option value="Los Angeles">
                <option value="Chicago">
            </datalist>
        </div>
    </div>
@endsection
