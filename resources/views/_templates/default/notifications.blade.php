<script>
    @if (notify()->ready())
        swal("{{ notify()->message() }}", '', "{{ notify()->type() }}");
    @endif
</script>
