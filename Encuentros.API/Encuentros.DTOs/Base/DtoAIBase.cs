namespace Encuentros.DTOs.Base
{
    /// <summary>
    /// Dto with Activate/Inactivate
    /// </summary>
    public abstract class DtoAIBase : DtoBase
    {
        public bool IsActive { get; set; }
    }
}