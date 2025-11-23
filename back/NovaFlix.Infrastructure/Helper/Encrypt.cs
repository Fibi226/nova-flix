using System.Security.Cryptography;
using System.Text;

namespace NovaFlix.Infrastructure.Helper
{
    public class Encrypt
    {
        public string EncryptPassword(string password)
        {
            using var sha128 = SHA1.Create();
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] hash = sha128.ComputeHash(passwordBytes);
            return Convert.ToBase64String(hash);
        }
    }
}
