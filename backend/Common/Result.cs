public record Result<T>(T? Value, string? Error)
{
    public bool Ok => Error is null;
    public static Result<T> Success(T value) => new(value, null);
    public static Result<T> Failure(string errorMessage) => new(default, errorMessage);
}